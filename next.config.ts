// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [

      // ✅ Production API Images
      {
        protocol: "http",s
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