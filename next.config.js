/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
      {
        protocol: 'https',
        hostname: 'calm-animal-441e5f296f.strapiapp.com',
      },
    ],
  },
};
module.exports = nextConfig
