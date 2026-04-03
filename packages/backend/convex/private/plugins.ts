import { query } from "../_generated/server";
import { v, ConvexError } from "convex/values";

export const getOne = query({
  args: {
    service: v.union(v.literal("vapi"))
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
  },
})