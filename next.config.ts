import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // the project OG image is rendered on demand and reads the MDX front matter
  outputFileTracingIncludes: {
    "/[locale]/project/[slug]/opengraph-image": ["./content/projects/**/*"],
  },
  async redirects() {
    return [
      // the old Vercel address serves the same pages; send it to the real domain so only one copy is indexed
      {
        source: "/:path*",
        has: [{ type: "host", value: "online-bio.vercel.app" }],
        destination: "https://stragalinos.gr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
