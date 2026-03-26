import type { WPPost, WPPage, WPCategory, WPAuthorFull } from "@/types/wordpress"

const REVALIDATE = 3600

function getApiBase(): string {
  const url = process.env.WORDPRESS_URL
  if (!url) throw new Error("WORDPRESS_URL environment variable is not set")
  return `${url}/wp-json/wp/v2`
}

async function wpFetch<T>(path: string, revalidate = REVALIDATE): Promise<T | null> {
  try {
    const res = await fetch(`${getApiBase()}${path}`, {
      next: { revalidate },
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export async function getPosts(page = 1, perPage = 10): Promise<WPPost[]> {
  const data = await wpFetch<WPPost[]>(
    `/posts?page=${page}&per_page=${perPage}&_embed&status=publish`
  )
  return data ?? []
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const data = await wpFetch<WPPost[]>(`/posts?slug=${encodeURIComponent(slug)}&_embed`)
  return data?.[0] ?? null
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const slugs: { slug: string }[] = []
  let page = 1

  while (true) {
    try {
      const res = await fetch(
        `${getApiBase()}/posts?page=${page}&per_page=100&_fields=slug&status=publish`,
        { next: { revalidate: REVALIDATE } }
      )
      if (!res.ok) break

      const data: WPPost[] = await res.json()
      if (!data.length) break

      slugs.push(...data.map((p) => ({ slug: p.slug })))

      const totalPages = parseInt(res.headers.get("X-WP-TotalPages") ?? "1", 10)
      if (page >= totalPages) break
      page++
    } catch {
      break
    }
  }

  return slugs
}

export async function getPages(perPage = 100): Promise<WPPage[]> {
  const data = await wpFetch<WPPage[]>(
    `/pages?per_page=${perPage}&_embed&status=publish`
  )
  return data ?? []
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const data = await wpFetch<WPPage[]>(`/pages?slug=${encodeURIComponent(slug)}&_embed`)
  return data?.[0] ?? null
}

export async function getPostsByCategory(categoryId: number, page = 1, perPage = 10): Promise<WPPost[]> {
  const data = await wpFetch<WPPost[]>(
    `/posts?categories=${categoryId}&page=${page}&per_page=${perPage}&_embed&status=publish`
  )
  return data ?? []
}

export async function getPostsByAuthor(authorId: number, page = 1, perPage = 10): Promise<WPPost[]> {
  const data = await wpFetch<WPPost[]>(
    `/posts?author=${authorId}&page=${page}&per_page=${perPage}&_embed&status=publish`
  )
  return data ?? []
}

export async function getCategories(): Promise<WPCategory[]> {
  const data = await wpFetch<WPCategory[]>(`/categories?per_page=100&hide_empty=true`)
  return data ?? []
}

export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  const data = await wpFetch<WPCategory[]>(`/categories?slug=${encodeURIComponent(slug)}`)
  return data?.[0] ?? null
}

export async function getAuthors(): Promise<WPAuthorFull[]> {
  const data = await wpFetch<WPAuthorFull[]>(`/users?per_page=100&who=authors`)
  return data ?? []
}

export async function getAuthorBySlug(slug: string): Promise<WPAuthorFull | null> {
  const data = await wpFetch<WPAuthorFull[]>(`/users?slug=${encodeURIComponent(slug)}`)
  return data?.[0] ?? null
}

export async function getAllPageSlugs(): Promise<{ slug: string }[]> {
  const slugs: { slug: string }[] = []
  let page = 1

  while (true) {
    try {
      const res = await fetch(
        `${getApiBase()}/pages?page=${page}&per_page=100&_fields=slug&status=publish`,
        { next: { revalidate: REVALIDATE } }
      )
      if (!res.ok) break

      const data: WPPage[] = await res.json()
      if (!data.length) break

      slugs.push(...data.map((p) => ({ slug: p.slug })))

      const totalPages = parseInt(res.headers.get("X-WP-TotalPages") ?? "1", 10)
      if (page >= totalPages) break
      page++
    } catch {
      break
    }
  }

  return slugs
}
