import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/mohalla-app',
  assetPrefix: '/mohalla-app',
  // Ensure images are also correctly prefixed
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
