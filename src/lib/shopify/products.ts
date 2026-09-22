import { shopifyFetch } from "./client";
import { PRODUCT_BY_HANDLE_QUERY, PRODUCTS_QUERY } from "./queries";
import type { Product } from "./types";
import { SPECIMEN_ORDER } from "@/lib/brand/palette";

/**
 * Storefront reads are non-critical: a failed fetch should degrade the section
 * that needed it, never take down the page. Callers handle `null`/`[]`.
 */
export async function getProductByHandle(handle: string): Promise<Product | null> {
  try {
    const data = await shopifyFetch<{ product: Product | null }, { handle: string }>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });
    return data.product;
  } catch (error) {
    console.error(`[shopify] getProductByHandle(${handle}) failed:`, error);
    return null;
  }
}

/**
 * Shopify returns products in its own order. The storefront presents them in a
 * fixed sequence chosen so adjacent pack colours contrast; anything not in that
 * list (a new SKU, say) is appended rather than dropped.
 */
export function orderProducts(products: Product[]): Product[] {
  const byHandle = new Map(products.map((p) => [p.handle, p]));
  const ordered = SPECIMEN_ORDER.flatMap((handle) => {
    const product = byHandle.get(handle);
    return product ? [product] : [];
  });
  const known = new Set(SPECIMEN_ORDER);
  return [...ordered, ...products.filter((p) => !known.has(p.handle))];
}

export async function getProducts(first = 20): Promise<Product[]> {
  try {
    const data = await shopifyFetch<
      { products: { edges: { node: Product }[] } },
      { first: number }
    >({
      query: PRODUCTS_QUERY,
      variables: { first },
    });
    return data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("[shopify] getProducts failed:", error);
    return [];
  }
}
