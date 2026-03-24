import { mutation, query } from '../_generated/server'
import { ConvexError, v } from 'convex/values'

export const getOne = query({
  args: {
    conversationId: v.id('conversations'),
    contactSessionId: v.id('contactSessions')
  },
  handler: async(ctx, args) => {
    const session = await ctx.db.get(args.contactSessionId)

    if(!session || session.expiresAt < Date.now()) {
      throw new ConvexError({ 
        code: 'UNAUTHORIZED',
        message: 'Invaild session'
      })
    }

    const conversation = await ctx.db.get(args.conversationId)

    if(!conversation) return null

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
    
    // TODO: Replace once fuctionality for thread creation is present 
    const threadId = '123'
    
    const conversationId = await ctx.db.insert('conversations', {
      contactSessionId: session._id,
      status: 'unresolved',
      organizationID: args.organizationID,
      threadId
    })

    return conversationId
  }
})
