import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/mahalla-app',
  assetPrefix: '/mahalla-app',
  // Ensure images are also correctly prefixed and compatible with static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
