/**
 * Direct-to-checkout permalinks.
 *
 * Shopify serves `/cart/{numericVariantId}:{quantity}` as a 302 into a real
 * checkout, which lets the storefront transact against Shopify's own checkout
 * before an in-site cart exists. Verified against this store: the URL redirects
 * to `/checkouts/cn/...`.
 *
 * This is an interim path. A persistent cart (add / update / remove, line items
 * surviving navigation) needs the Storefront Cart API and replaces this.
 */

/** Storefront ids arrive as `gid://shopify/ProductVariant/123`; permalinks want the number. */
export function variantNumericId(gid: string): string {
  return gid.split("/").pop() ?? "";
}

export function checkoutPermalink(
  storeDomain: string,
  variantGid: string,
  quantity = 1
): string {
  return `https://${storeDomain}/cart/${variantNumericId(variantGid)}:${Math.max(1, quantity)}`;
}
