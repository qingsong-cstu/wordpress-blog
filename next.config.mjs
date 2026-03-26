/** @type {import('next').NextConfig} */
const wordpressUrl = process.env.WORDPRESS_URL ?? 'http://localhost'
const wordpressHostname = new URL(wordpressUrl).hostname

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: wordpressHostname,
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
      {
        protocol: 'http',
        hostname: '*.gravatar.com',
      },
    ],
  },
}

export default nextConfig
