import { mutation } from "../_generated/server";
import { ConvexError, v } from "convex/values";
import { upsertVapiPluginCredentials } from "../lib/pluginCredentials";

export const upsert = mutation({
  args: {
    service: v.union(v.literal("vapi")),
    value: v.any(),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Identity not found",
      });
    }

    const orgId = identity.orgId as string;

    if (!orgId) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Organization not found",
      });
    }

    // TODO: Check for subscription
    await upsertVapiPluginCredentials(ctx, orgId, args.value);
  },
});
