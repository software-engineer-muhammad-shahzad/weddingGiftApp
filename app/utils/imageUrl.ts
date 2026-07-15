// Relative content paths (e.g. "content/wishing-cards/...") come back from the
// API and are served by the backend itself, not the frontend's own domain —
// resolve them against the API host, not NEXT_PUBLIC_BASE_URL.
const assetBaseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/api\/?$/, "")

export const buildContentImageUrl = (path?: string | null) => {
  if (!path) return ""
  if (/^https?:\/\//i.test(path)) return path
  return `${assetBaseUrl}/${path.replace(/^\/+/, "")}`
}
