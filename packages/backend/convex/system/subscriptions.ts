import { v } from "convex/values"
import { internalMutation, internalQuery } from "../_generated/server"

 export const upsert = internalMutation({
  args: {
    organizationID: v.string(),
    status: v.string()
  },

  handler: async (ctx, args) => {
    const existingSubscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_organization_id", (q) => 
        q.eq("organizationID", args.organizationID)
      )
      .unique()

    if(existingSubscription) {
      await ctx.db.patch(existingSubscription._id, {
        status: args.status
      })
    }else {
      await ctx.db.insert("subscriptions", {
        organizationID: args.organizationID,
        status: args.status
      })
    }
  }
 })

 export const getByOrganizationId = internalQuery({
  args: {
    organizationID: v.string()
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("subscriptions")
      .withIndex("by_organization_id", (q) => 
        q.eq("organizationID", args.organizationID)
      )
      .unique()
  }
 })
