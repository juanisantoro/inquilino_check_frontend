/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    middlewarePrefetch: "flexible"
  }
};

module.exports = nextConfig;