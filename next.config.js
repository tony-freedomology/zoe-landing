const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '',
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/text',
        destination: '/beta-welcome',
        permanent: false,
      },
      {
        source: '/features',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/quote',
        destination: '/why-zoe',
        permanent: true,
      },
      {
        // Post retired in September 2026.
        source: '/blog/the-same-tree-every-morning',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
}
module.exports = nextConfig
