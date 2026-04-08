import { v } from "convex/values";
import { query } from "../_generated/server";

export const getByOrganizationId = query({
  args: {
    organizationID: v.string()
  },

  handler: async (ctx, args) => {
    const widgetSettings = await ctx.db
    .query("widgetSettings")
    .withIndex("by_organization_id", (q) => 
      q.eq("organizationID", args.organizationID)
    )
    .unique()

    return widgetSettings
  }
})