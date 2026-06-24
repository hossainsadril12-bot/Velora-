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
  async redirects() {
    return [
      {
        source: "/advisor",
        destination: "/adviser",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
