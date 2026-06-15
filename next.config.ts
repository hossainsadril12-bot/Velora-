import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.sanfelice.com",
        pathname: "/app/uploads/**",
      },
    ],
  },
};

export default nextConfig;
