import Link from "next/link"
import MobileMenu from "./MobileMenu"

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          My Blog
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <Link href="/categories" className="hover:text-gray-900 transition-colors">Categories</Link>
          <Link href="/authors" className="hover:text-gray-900 transition-colors">Authors</Link>
          <Link href="/pages/about" className="hover:text-gray-900 transition-colors">About</Link>
        </nav>

        {/* Mobile hamburger */}
        <MobileMenu />
      </div>
    </header>
  )
}
