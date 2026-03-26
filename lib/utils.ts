import type { WPPost } from "@/types/wordpress"

export function formatDate(isoString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(isoString))
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + "…"
}

export function getWPImageUrl(post: WPPost, size = "medium_large"): string | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0]
  if (!media) return null
  return media.media_details?.sizes?.[size]?.source_url ?? media.source_url ?? null
}
