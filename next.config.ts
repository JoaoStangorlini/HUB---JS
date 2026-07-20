import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/aurtistic/privacy-policy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/aurtistic/delete-account',
        destination: '/delete-account',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
