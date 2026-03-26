import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getCategoryBySlug, getCategories, getPostsByCategory } from "@/lib/wordpress"
import PostCard from "@/components/PostCard"

export const revalidate = 3600

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug)
  if (!category) return {}
  return {
    title: category.name,
    description: category.description || `Posts in ${category.name}`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const category = await getCategoryBySlug(params.slug)
  if (!category) notFound()

  const posts = await getPostsByCategory(category.id)

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm text-blue-600 font-medium uppercase tracking-wide mb-1">Category</p>
        <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600 mt-2">{category.description}</p>
        )}
      </div>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts in this category.</p>
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
