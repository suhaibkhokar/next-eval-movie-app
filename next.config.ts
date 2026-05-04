/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
  allowedDevOrigins: ["192.168.1.12", "192.168.1.8"],
};

module.exports = nextConfig;