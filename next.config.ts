import type { NextConfig } from "next";
import { fa } from "zod/v4/locales";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    useCache: true,
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io'
      }
    ]
  }
};





export default nextConfig;

