import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath sets the directory the app is served from
  basePath: '/mohalla-hub',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static HTML export
  }
};

export default nextConfig;
