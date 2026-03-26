import { notFound } from "next/navigation"
import Image from "next/image"
import type { Metadata } from "next"
import { getPageBySlug, getAllPageSlugs } from "@/lib/wordpress"
import PostContent from "@/components/PostContent"
import { stripHtml } from "@/lib/utils"

export const revalidate = 86400

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs()
  return slugs
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const page = await getPageBySlug(params.slug)
  if (!page) return {}

  const description = stripHtml(page.excerpt.rendered).slice(0, 160)
  const featuredMedia = page._embedded?.["wp:featuredmedia"]?.[0]

  return {
    title: stripHtml(page.title.rendered),
    description,
    openGraph: {
      title: stripHtml(page.title.rendered),
      description,
      images: featuredMedia ? [{ url: featuredMedia.source_url }] : [],
    },
  }
}

export default async function PagePage({
  params,
}: {
  params: { slug: string }
}) {
  const page = await getPageBySlug(params.slug)
  if (!page) notFound()

  const featuredMedia = page._embedded?.["wp:featuredmedia"]?.[0]

  return (
    <article>
      <header className="mb-8">
        <h1
          className="text-4xl font-bold text-gray-900 leading-tight"
          dangerouslySetInnerHTML={{ __html: page.title.rendered }}
        />
      </header>

      {featuredMedia && (
        <div className="relative w-full aspect-video mb-8 rounded-xl overflow-hidden">
          <Image
            src={featuredMedia.source_url}
            alt={featuredMedia.alt_text ?? stripHtml(page.title.rendered)}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <PostContent html={page.content.rendered} />
    </article>
  )
}
