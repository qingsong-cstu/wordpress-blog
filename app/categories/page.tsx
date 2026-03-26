import type { Metadata } from "next"
import Link from "next/link"
import { getCategories } from "@/lib/wordpress"

export const metadata: Metadata = { title: "Categories" }
export const revalidate = 3600

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>
      {categories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="block p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-sm transition-all"
            >
              <h2 className="font-semibold text-gray-900">{cat.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{cat.count} post{cat.count !== 1 ? "s" : ""}</p>
              {cat.description && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{cat.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
