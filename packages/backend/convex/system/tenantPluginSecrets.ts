import { v } from "convex/values";
import { internalMutation, internalQuery } from "../_generated/server";

export const getBySecretName = internalQuery({
  args: { secretName: v.string() },
  handler: async (ctx, args) => {
    const row = await ctx.db
      .query("tenantPluginSecrets")
      .withIndex("by_secret_name", (q) => q.eq("secretName", args.secretName))
      .unique();
    return row?.value ?? null;
  },
});

export const upsertValue = internalMutation({
  args: {
    secretName: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("tenantPluginSecrets")
      .withIndex("by_secret_name", (q) => q.eq("secretName", args.secretName))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value });
    } else {
      await ctx.db.insert("tenantPluginSecrets", {
        secretName: args.secretName,
        value: args.value,
      });
    }
  },
});
