// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // IIS routes this app (port 3000) and another Next app (port 3002) on the same
  // domain, and both would otherwise serve their JS/CSS from /_next/static. A unique
  // prefix lets IIS send this app's assets to port 3000 (see web.config rule).
  assetPrefix: process.env.NODE_ENV === "production" ? "/couple-assets" : undefined,

  images: {
    remotePatterns: [

      // ✅ Production API Images (uploads, wishing-card content, etc.)
      {
        protocol: "https",
        hostname: "adminapis.shagundirect.com",
        pathname: "/**",
      },

      // Old backend host, kept for images uploaded before the migration
      {
        protocol: "http",
        hostname: "www.shagundirect.somee.com",
        pathname: "/uploads/**",
      },

      // ✅ Localhost Images (optional)
      {
        protocol: "https",
        hostname: "localhost",
        port: "44382",
        pathname: "/uploads/**",
      },

    ],
  },
};

export default nextConfig;