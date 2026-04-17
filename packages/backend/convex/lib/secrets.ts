/** 与 `lib/pluginCredentials` / upsert 写入时相同的存储键。 */
export function tenantPluginStorageKey(
  organizationID: string,
  service: "vapi",
): string {
  return `tenant/${organizationID}/${service}`;
}

/**  Convex JSON  */
export function parseSecretString<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
