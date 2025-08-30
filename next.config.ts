import type { NextConfig } from "next";
import { fa } from "zod/v4/locales";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    useCache: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
