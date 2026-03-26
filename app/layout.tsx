import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: {
    template: "%s | My Blog",
    default: "My Blog",
  },
  description: "A headless WordPress blog powered by Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
