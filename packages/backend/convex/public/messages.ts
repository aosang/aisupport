import { saveMessage } from "@convex-dev/agent";
import { components, internal } from "../_generated/api";
import { action, query } from "../_generated/server";
import { ConvexError, v } from 'convex/values'
import { supportAgent } from "../system/ai/agents/supportAgent";
import { paginationOptsValidator } from "convex/server";
import { resolveConversation } from "../system/ai/tools/resolveConversation";
import { escalatedConversation } from "../system/ai/tools/escalateConversation";
import { search } from "../system/ai/tools/search";

export const create = action({
  args: {
    prompt: v.string(),
    threadId: v.string(),
    contactSessionId: v.id('contactSessions')
  },

  handler: async (ctx, args) => {
    const contactSession = await ctx.runQuery(
      internal.system.contactSessions.getOne,
      {
        contactSessionId: args.contactSessionId
      }
    )

    if(!contactSession || contactSession.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invaild session"
      })
    }

    const conversation = await ctx.runQuery(
      internal.system.conversations.getByThreadId,
      {
        threadId: args.threadId
      }
    )

    if(!conversation) {
      throw new ConvexError({
        code: "Not Found",
        message: "Conversation not found"
      })
    }

    if(conversation.status === 'resolved') {
      throw new ConvexError({
        code: "BAD_REQUEST",
        message: "Conversation resolved"
      })
    }

    // TODO: Implement subscription check
    const shouldTriggerAgent = conversation.status === "unresolved"

    if(shouldTriggerAgent) {
      // Implement subscription check
      await supportAgent.generateText(
        ctx,
        {threadId: args.threadId},
        {
          prompt: args.prompt, 
          tools: {
            resolveConversationTool: resolveConversation,
            escalatedConversationTool: escalatedConversation,
            searchTool: search
          }
        }
      )
    }else {
      await saveMessage(ctx, components.agent, {
        threadId: args.threadId,
        prompt: args.prompt
      })
    }
  }
})
 
export const getMany = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
    contactSessionId: v.id('contactSessions' )
  },
 
  handler: async (ctx, agrs) => {
    const contactSession = await ctx.db.get(agrs.contactSessionId)

    if(!contactSession || contactSession.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invaild session"
      })
    }

    const paginated = await supportAgent.listMessages(ctx, {
      threadId: agrs.threadId,
      paginationOpts: agrs.paginationOpts,
    })
    
    return paginated
  }
}) 