// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [

      // ✅ Production API Images
      {
        protocol: "https",
        hostname: "adminapis.shagundirect.com",
        pathname: "/uploads/profiles/**",
      },

      // Old backend host, kept for images uploaded before the migration
      {
        protocol: "http",
        hostname: "www.shagundirect.somee.com",
        pathname: "/uploads/profiles/**",
      },

      // ✅ Localhost Images (optional)
      {
        protocol: "https",
        hostname: "localhost",
        port: "7241",
        pathname: "/uploads/profiles/**",
      },

    ],
  },
};

export default nextConfig;