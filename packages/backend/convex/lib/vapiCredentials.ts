import { internal } from "../_generated/api";
import type { ActionCtx } from "../_generated/server";
import { tenantPluginStorageKey } from "./secrets";

/**
 
 */
export async function loadVapiTenantSecretRaw(
  ctx: ActionCtx,
  organizationId: string,
  pluginSecretName: string,
): Promise<string | null> {
  const primary = tenantPluginStorageKey(organizationId, "vapi");
  let raw = await ctx.runQuery(
    internal.system.tenantPluginSecrets.getBySecretName,
    { secretName: primary },
  );
  if (raw !== null) {
    return raw;
  }
  if (pluginSecretName && pluginSecretName !== primary) {
    raw = await ctx.runQuery(
      internal.system.tenantPluginSecrets.getBySecretName,
      { secretName: pluginSecretName },
    );
  }
  return raw;
}
