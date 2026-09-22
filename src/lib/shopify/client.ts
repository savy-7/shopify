const API_VERSION = "2026-07";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

type ShopifyFetchArgs<TVariables> = {
  query: string;
  variables?: TVariables;
  revalidate?: number;
};

export async function shopifyFetch<TData, TVariables = Record<string, unknown>>({
  query,
  variables,
  revalidate = 3600,
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
    next: { revalidate },
  });

  const body = await response.json();

  if (body.errors) {
    throw new Error(
      `Shopify Storefront API error: ${body.errors.map((e: { message: string }) => e.message).join(", ")}`
    );
  }

  return body.data as TData;
}
