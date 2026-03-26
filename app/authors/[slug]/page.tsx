import { notFound } from "next/navigation"
import Image from "next/image"
import type { Metadata } from "next"
import { getAuthorBySlug, getAuthors, getPostsByAuthor } from "@/lib/wordpress"
import PostCard from "@/components/PostCard"

export const revalidate = 3600

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug)
  if (!author) return {}
  return {
    title: author.name,
    description: author.description || `Posts by ${author.name}`,
  }
}

export default async function AuthorPage({
  params,
}: {
  params: { slug: string }
}) {
  const author = await getAuthorBySlug(params.slug)
  if (!author) notFound()

  const posts = await getPostsByAuthor(author.id)

  return (
    <div>
      <div className="flex items-center gap-5 mb-8">
        {author.avatar_urls?.["96"] && (
          <Image
            src={author.avatar_urls["96"]}
            alt={author.name}
            width={72}
            height={72}
            className="rounded-full flex-shrink-0"
          />
        )}
        <div>
          <p className="text-sm text-blue-600 font-medium uppercase tracking-wide mb-1">Author</p>
          <h1 className="text-3xl font-bold text-gray-900">{author.name}</h1>
          {author.description && (
            <p className="text-gray-600 mt-1">{author.description}</p>
          )}
        </div>
      </div>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts by this author.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
