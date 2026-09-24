const API_VERSION = "2026-07";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

/**
 * Cache tag for anything product-shaped. Shopify's product/inventory webhooks
 * hit /api/revalidate, which invalidates this tag so an admin edit shows up
 * immediately rather than waiting out the time-based window below.
 */
export const PRODUCTS_TAG = "shopify-products";

/**
 * Backstop only. Webhook invalidation is what makes edits appear promptly;
 * this is how long stale data can survive if a webhook is never configured or
 * silently fails. Five minutes keeps the common case fast without letting a
 * price sit wrong for an hour.
 */
const DEFAULT_REVALIDATE = 300;

type ShopifyFetchArgs<TVariables> = {
  query: string;
  variables?: TVariables;
  revalidate?: number;
  tags?: string[];
};

export async function shopifyFetch<TData, TVariables = Record<string, unknown>>({
  query,
  variables,
  revalidate = DEFAULT_REVALIDATE,
  tags,
}: ShopifyFetchArgs<TVariables>): Promise<TData> {
  if (!domain || !token) {
    throw new Error(
      "Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN. Check your .env.local file."
    );
  }

  const response = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Private (server-side) tokens authenticate with this header. Public
      // tokens would use X-Shopify-Storefront-Access-Token instead.
      "Shopify-Storefront-Private-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate, ...(tags ? { tags } : {}) },
  });

  const body = await response.json();

  if (body.errors) {
    throw new Error(
      `Shopify Storefront API error: ${body.errors.map((e: { message: string }) => e.message).join(", ")}`
    );
  }

  return body.data as TData;
}
