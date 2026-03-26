interface PostContentProps {
  html: string
}

export default function PostContent({ html }: PostContentProps) {
  return (
    <div
      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-img:rounded-lg"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
