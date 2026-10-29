import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/en.json",
  },
});

const pagesExport = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Static export is for the Cloudflare Pages build. It breaks `next dev`.
  ...(pagesExport ? { output: "export" as const } : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: pagesExport,
  },
};

export default withNextIntl(nextConfig);
