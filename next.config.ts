import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/recipes',
        destination: '/codex?tab=resep',
        permanent: false,
      },
      {
        source: '/resep',
        destination: '/codex?tab=resep',
        permanent: false,
      },
      {
        source: '/katalog',
        destination: '/codex?tab=resep',
        permanent: false,
      },
      {
        source: '/katalog-resep',
        destination: '/codex?tab=resep',
        permanent: false,
      },
      {
        source: '/jamu',
        destination: '/codex?tab=jamu',
        permanent: false,
      },
      {
        source: '/khasiat-jamu',
        destination: '/codex?tab=jamu',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
