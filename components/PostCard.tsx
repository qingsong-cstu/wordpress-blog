import Link from "next/link"
import Image from "next/image"
import type { WPPost } from "@/types/wordpress"
import { formatDate, stripHtml, truncate, getWPImageUrl } from "@/lib/utils"

interface PostCardProps {
  post: WPPost
}

export default function PostCard({ post }: PostCardProps) {
  const imageUrl = getWPImageUrl(post, "medium_large")
  const author = post._embedded?.author?.[0]
  const excerpt = truncate(stripHtml(post.excerpt.rendered), 180)
  const categories = post._embedded?.["wp:term"]?.[0] ?? []

  return (
    <article className="flex gap-6 pb-8 border-b border-gray-100 last:border-0">
      {imageUrl && (
        <div className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={stripHtml(post.title.rendered)}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        {categories.length > 0 && (
          <div className="flex gap-2 mb-2">
            {categories.slice(0, 3).map((cat) => (
              <span
                key={cat.id}
                className="text-xs font-medium text-blue-600 uppercase tracking-wide"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}
        <Link href={`/posts/${post.slug}`}>
          <h2
            className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 leading-snug"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </Link>
        <div className="text-sm text-gray-500 mb-2">
          {author && <span>{author.name} &middot; </span>}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        {excerpt && <p className="text-gray-600 text-sm leading-relaxed">{excerpt}</p>}
      </div>
    </article>
  )
}
