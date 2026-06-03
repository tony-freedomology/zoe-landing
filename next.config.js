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
        destination: 'https://app.zoe.live/text',
        permanent: false,
      },
    ];
  },
}
module.exports = nextConfig
