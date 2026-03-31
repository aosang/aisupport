
import { internalMutation, internalQuery } from "../_generated/server";
import { ConvexError, v } from 'convex/values'

export const escalated = internalMutation({
  args: {
    threadId: v.string()
  },

  handler: async (ctx, args) => {
    const conversation = await ctx.db
    .query('conversations')
    .withIndex('by_thread_id', q => q.eq('threadId', args.threadId))
    .unique()

    if(!conversation) {
      throw new ConvexError({
        code: "Not Found",
        message: "Conversation not found" 
      })
    }
    
    await ctx.db.patch(conversation._id, { status: "escalated" })
  }
})


export const resolved = internalMutation({
  args: {
    threadId: v.string()
  },

  handler: async (ctx, args) => {
    const conversation = await ctx.db
    .query('conversations')
    .withIndex('by_thread_id', q => q.eq('threadId', args.threadId))
    .unique()

    if(!conversation) {
      throw new ConvexError({
        code: "Not Found",
        message: "Conversation not found" 
      })
    }
    
    await ctx.db.patch(conversation._id, { status: "resolved" })
  }
})

export const getByThreadId = internalQuery({
  args: {
    threadId: v.string()
  },

  handler: async (ctx, args) => {
    const conversation = await ctx.db
    .query("conversations")
    .withIndex('by_thread_id', (q) => q.eq("threadId", args.threadId))
    .unique()
  
    return conversation
  }
})