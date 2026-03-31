import { saveMessage } from "@convex-dev/agent";
import { components } from "../_generated/api"; 
import { mutation, query, action } from "../_generated/server";
import { ConvexError, v } from 'convex/values'
import { supportAgent } from "../system/ai/agents/supportAgent";
import { paginationOptsValidator } from "convex/server";
import { generateText} from 'ai'
import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({
  baseURL: "https://api.gptsapi.net/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export const enhanceResponse = action({
  args: {
    prompt: v.string()
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if(identity === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found"
      })
    }

    const orgId = identity.orgId as string
    if(!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid organization ID"
      })
    }

    const response = await generateText({
      model: openai.chat("gpt-4o-mini"),
      messages: [
        {
          role: 'system',
          content: "Enhance the operator's message to be more professional, clear, and helpful while maintaining their intent and key information"
        },
        {
          role: 'user',
          content: args.prompt
        }
      ]
    })
    return response.text 
  }
})

export const create = mutation({
  args: { 
    prompt: v.string(),
    conversationId: v.id('conversations')
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if(identity === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found"
      })
    }

     const conversation = await ctx.db.get(args.conversationId) 

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

    if(conversation.status === 'unresolved') {
      await ctx.db.patch(args.conversationId, {
        status: "escalated"
      })
    }

    const orgId = identity.orgId as string
    if(!orgId || conversation.organizationID !== orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid organization ID"
      })
    }

    const rawAgentName = identity.familyName ?? identity.firstName
    const agentName = typeof rawAgentName === "string" ? rawAgentName : "Operator"

    await saveMessage(ctx, components.agent, {
      threadId: conversation.threadId,
      agentName,
      message: {
        role: "assistant",
        // Later Modify to widget settings inital message
        content: args.prompt
      }
    })
   
  }
})
 
export const getMany = query({
  args: {
    threadId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
 
  handler: async (ctx, agrs) => {
    const indentity = await ctx.auth.getUserIdentity()

    if(indentity === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found"
      })
    }

    const orgId = indentity.orgId as string

    if(!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found"
      })
    }

    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_thread_id", q => q.eq("threadId", agrs.threadId))
      .unique()

    if(!conversation) {
      throw new ConvexError({
        code: "Not Found",
        message: "Conversation not found"
      })
    }

    if(conversation.organizationID !== orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid organization ID",
      })
    }

    const paginated = await supportAgent.listMessages(ctx, {
      threadId: agrs.threadId,
      paginationOpts: agrs.paginationOpts,
    })
    
    return paginated
  }
}) 