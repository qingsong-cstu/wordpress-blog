import type { Metadata } from "next"
import { getPosts } from "@/lib/wordpress"
import PostCard from "@/components/PostCard"

export const metadata: Metadata = {
  title: "Home",
}

export const revalidate = 3600

export default async function HomePage() {
  const posts = await getPosts(1, 10)

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Recent Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">
          No posts found. Make sure your{" "}
          <code className="bg-gray-100 px-1 rounded text-sm">WORDPRESS_URL</code> is set
          correctly in <code className="bg-gray-100 px-1 rounded text-sm">.env.local</code>.
        </p>
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
