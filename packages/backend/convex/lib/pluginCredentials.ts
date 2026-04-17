import type { MutationCtx } from "../_generated/server";
import { tenantPluginStorageKey } from "./secrets";

/** 在同一 mutation 中原子写入凭证与 plugins 行，避免 scheduler 导致「有 plugin、无凭证」。 */
export async function upsertVapiPluginCredentials(
  ctx: MutationCtx,
  organizationID: string,
  value: unknown,
): Promise<void> {
  const service = "vapi" as const;
  const secretName = tenantPluginStorageKey(organizationID, service);
  const valueJson = JSON.stringify(value);

  const existingSecret = await ctx.db
    .query("tenantPluginSecrets")
    .withIndex("by_secret_name", (q) => q.eq("secretName", secretName))
    .unique();

  if (existingSecret) {
    await ctx.db.patch(existingSecret._id, { value: valueJson });
  } else {
    await ctx.db.insert("tenantPluginSecrets", {
      secretName,
      value: valueJson,
    });
  }

  const existingPlugin = await ctx.db
    .query("plugins")
    .withIndex("by_organization_id_and_service", (q) =>
      q.eq("organizationID", organizationID).eq("service", service),
    )
    .unique();

  if (existingPlugin) {
    await ctx.db.patch(existingPlugin._id, {
      service,
      secretName,
    });
  } else {
    await ctx.db.insert("plugins", {
      organizationID,
      service,
      secretName,
    });
  }
}
