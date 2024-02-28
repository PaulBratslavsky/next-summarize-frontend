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
        hostname: 'meaningful-melody-7b98e28220.media.strapiapp.com',
      },
    ],
  },
};
module.exports = nextConfig
