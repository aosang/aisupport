import { saveMessage } from "@convex-dev/agent";
import { components } from "../_generated/api";
import { mutation, query } from '../_generated/server'
import { ConvexError, v } from 'convex/values'
import { supportAgent } from '../system/ai/agents/supportAgent'

export const getOne = query({
  args: {
    conversationId: v.id('conversations'),
    contactSessionId: v.id('contactSessions')
  },
  handler: async(ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId)

    if(!session || session.expiresAt < Date.now()) {
      throw new ConvexError({ 
        code: 'Not Found',
        message: 'conversation not found'
      })
    }

    const conversation = await ctx.db.get(args.conversationId)

    if(!conversation) return null

    if(conversation.contactSessionId !== session._id) {
      throw new ConvexError({
        code: 'UNAUTHORIZED',
        message: 'Incorrect session'
      })
    }

    return {
      _id: conversation._id,
      status: conversation.status,
      threadId: conversation.threadId
    }
  }
})

export const create = mutation({
  args: {
    organizationID: v.string(),
    contactSessionId: v.id('contactSessions'),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId)

    if(!session || session.expiresAt < Date.now()) {
      throw new ConvexError({ 
        code: 'UNAUTHORIZED',
        message: 'Invaild session'
      })
    }
    
    const { threadId } = await supportAgent.createThread(ctx, {
      userId: args.organizationID
    })


    await saveMessage(ctx, components.agent, {
      threadId,
      message: {
        role: "assistant",
        // Later Modify to widget settings inital message
        content: "Hello, How can I help you today?"
      }
    })
    
    const conversationId = await ctx.db.insert('conversations', {
      contactSessionId: session._id,
      status: 'unresolved',
      organizationID: args.organizationID,
      threadId
    })

    return conversationId
  }
})
