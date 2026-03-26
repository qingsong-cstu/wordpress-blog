import { notFound } from "next/navigation"
import Image from "next/image"
import type { Metadata } from "next"
import { getPostBySlug, getAllPostSlugs } from "@/lib/wordpress"
import PostContent from "@/components/PostContent"
import { formatDate, stripHtml, getWPImageUrl } from "@/lib/utils"

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}

  const description = stripHtml(post.excerpt.rendered).slice(0, 160)
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0]

  return {
    title: stripHtml(post.title.rendered),
    description,
    openGraph: {
      title: stripHtml(post.title.rendered),
      description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: featuredMedia ? [{ url: featuredMedia.source_url }] : [],
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const author = post._embedded?.author?.[0]
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0]
  const categories = post._embedded?.["wp:term"]?.[0] ?? []
  const imageUrl = getWPImageUrl(post, "large") ?? featuredMedia?.source_url

  return (
    <article>
      <header className="mb-8">
        {categories.length > 0 && (
          <div className="flex gap-2 mb-3">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="text-xs font-semibold text-blue-600 uppercase tracking-wider"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}
        <h1
          className="text-4xl font-bold text-gray-900 leading-tight mb-4"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div className="flex items-center gap-3 text-sm text-gray-500">
          {author?.avatar_urls?.["48"] && (
            <Image
              src={author.avatar_urls["48"]}
              alt={author.name}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          {author && <span className="font-medium text-gray-700">{author.name}</span>}
          <span>&middot;</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </header>

      {imageUrl && (
        <div className="relative w-full aspect-video mb-8 rounded-xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={featuredMedia?.alt_text ?? stripHtml(post.title.rendered)}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <PostContent html={post.content.rendered} />
    </article>
  )
}
