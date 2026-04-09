import { mutation, query } from "../_generated/server";
import { ConvexError, v } from "convex/values";

export const upsert = mutation({
  args: {
    greetMessage: v.string(),
    defaultSuggestions: v.object({
      suggestion1: v.optional(v.string()),
      suggestion2: v.optional(v.string()),
      suggestion3: v.optional(v.string()),
    }),
    vapiSettings: v.object({
      assistantId: v.optional(v.string()),
      phoneNumber: v.optional(v.string())
    })
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

    const existingWidgetSettings = await ctx.db
      .query("widgetSettings")
      .withIndex("by_organization_id", (q) => q.eq("organizationID", orgId))
      .unique()

      if(existingWidgetSettings) {
        await ctx.db.patch(existingWidgetSettings._id, {
          greetMessage: args.greetMessage,
          defaultSuggestions: args.defaultSuggestions,
          vapiSettings: args.vapiSettings
        })
      }else {
        await ctx.db.insert("widgetSettings", {
          organizationID: orgId,
          greetMessage: args.greetMessage,
          defaultSuggestions: args.defaultSuggestions,
          vapiSettings: args.vapiSettings
        })
      }

  }
})

export const getOne = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    // Clerk org switch can briefly leave JWT unset; avoid throwing so the client can re-fetch.
    if(identity === null) {
      return null
    }

    const orgId = identity.orgId as string
    if(!orgId) {
      return null
    }

    const widgetSettings = await ctx.db
      .query("widgetSettings")
      .withIndex("by_organization_id", (q) => q.eq("organizationID", orgId))
      .unique()
    
    return widgetSettings
  }
})