import { v } from "convex/values"
import { internal } from "../_generated/api"
import { internalAction } from "../_generated/server"
import { upsertSecret } from "../lib/secrets"

export const upsert = internalAction({
  args: {
    organizationID : v.string(),
    service: v.union(v.literal("vapi")),
    value: v.any()
  },

  handler: async (ctx, args) => {
    const secretName = `tenant/${args.organizationID}/${args.service}`
    
    await upsertSecret(secretName,args.value)

    await ctx.runMutation(internal.system.plugins.upsert, {
      service: args.service,
      secretName,
      organizationID: args.organizationID
    })

    return {status: "success"}
  }
})