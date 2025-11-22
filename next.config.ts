import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bp87ef08z1.ufs.sh",
        pathname: "/**", // allow all paths
      },
    ],
  },
};

export default nextConfig;
