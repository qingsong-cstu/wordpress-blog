export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} My Blog. Powered by WordPress &amp; Next.js.
      </div>
    </footer>
  )
}
