export interface WPRendered {
  rendered: string
}

export interface WPImageSize {
  file: string
  width: number
  height: number
  mime_type: string
  source_url: string
}

export interface WPFeaturedMedia {
  id: number
  source_url: string
  alt_text: string
  media_details: {
    width: number
    height: number
    sizes: Record<string, WPImageSize>
  }
}

export interface WPAuthor {
  id: number
  name: string
  slug: string
  avatar_urls: Record<string, string>
}

export interface WPCategory {
  id: number
  name: string
  slug: string
  count: number
  description: string
}

export interface WPAuthorFull {
  id: number
  name: string
  slug: string
  description: string
  avatar_urls: Record<string, string>
  link: string
}

export interface WPPost {
  id: number
  date: string
  modified: string
  slug: string
  status: string
  title: WPRendered
  content: WPRendered
  excerpt: WPRendered
  featured_media: number
  author: number
  categories: number[]
  tags: number[]
  _embedded?: {
    author?: WPAuthor[]
    "wp:featuredmedia"?: WPFeaturedMedia[]
    "wp:term"?: WPCategory[][]
  }
}

export interface WPPage {
  id: number
  date: string
  modified: string
  slug: string
  status: string
  title: WPRendered
  content: WPRendered
  excerpt: WPRendered
  parent: number
  menu_order: number
  _embedded?: {
    author?: WPAuthor[]
    "wp:featuredmedia"?: WPFeaturedMedia[]
  }
}
