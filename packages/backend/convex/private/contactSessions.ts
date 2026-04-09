import { query } from "../_generated/server";
import { v, ConvexError } from "convex/values";

export const getOneByConversationId = query({
  args: {
    conversationID: v.id("conversations")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if(identity === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Unauthorized"
      })
    }

    const orgId = identity.orgId as string
    if(!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found"
      })
    }

    const conversation = await ctx.db.get(args.conversationID)
    
    if(!conversation) {
      throw new ConvexError({
        code: "Not Found",
        message: "Conversation not found"
      }) 
    }

    if(conversation.organizationID !== orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid organization id"
      }) 
    }

    const contactSession = await ctx.db.get(conversation.contactSessionId)

    return contactSession
  }
})