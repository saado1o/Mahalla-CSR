import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath: '/mohalla-app', // Uncomment if deploying to a subdirectory
  trailingSlash: true,
  // Removed output: 'export' to enable full Vercel capabilities (Image Optimization, etc.)
};

export default nextConfig;
