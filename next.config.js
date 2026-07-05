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
    ];
  },
}
module.exports = nextConfig
