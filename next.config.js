/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Обслуживаем статические HTML файлы как публичные ресурсы
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*.html',
          destination: '/public/:path*.html',
        },
      ],
    }
  },
}

module.exports = nextConfig
