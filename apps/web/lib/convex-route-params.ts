/**
 * Reject dynamic-route segments that are clearly not Convex document ids
 * (e.g. `/conversations/mylogo.svg` from a relative static asset URL).
 */
export function isLikelyConvexDocumentId(id: string): boolean {
  if (id.length < 10) return false
  if (id.includes("/") || id.includes(".")) return false
  return /^[a-zA-Z0-9_-]+$/.test(id)
}
