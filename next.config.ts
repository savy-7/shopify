import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  /**
   * Shopify's own theme URLs, which this storefront doesn't use. Anything
   * still pointing at them — an old ad, a Meta or Google catalogue feed, a
   * bookmark, a search result — would otherwise hit a 404.
   */
  async redirects() {
    return [
      { source: "/collections", destination: "/shop", permanent: true },
      { source: "/collections/:handle", destination: "/shop", permanent: true },
      { source: "/products", destination: "/shop", permanent: true },
      { source: "/pages/about-us", destination: "/about", permanent: true },
      { source: "/pages/contact", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
