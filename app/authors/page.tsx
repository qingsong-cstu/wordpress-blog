import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getAuthors } from "@/lib/wordpress"

export const metadata: Metadata = { title: "Authors" }
export const revalidate = 3600

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Authors</h1>
      {authors.length === 0 ? (
        <p className="text-gray-500">No authors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {authors.map((author) => (
            <Link
              key={author.id}
              href={`/authors/${author.slug}`}
              className="flex items-center gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-sm transition-all"
            >
              {author.avatar_urls?.["96"] && (
                <Image
                  src={author.avatar_urls["96"]}
                  alt={author.name}
                  width={56}
                  height={56}
                  className="rounded-full flex-shrink-0"
                />
              )}
              <div className="min-w-0">
                <h2 className="font-semibold text-gray-900">{author.name}</h2>
                {author.description && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{author.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
