import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { PRODUCTS_TAG } from "@/lib/shopify/client";

/**
 * Shopify webhook endpoint. Register it in Shopify admin under
 * Settings → Notifications → Webhooks for the product and inventory events
 * (products/create, products/update, products/delete, inventory_levels/update),
 * pointing at {site}/api/revalidate.
 *
 * Without this, an admin edit only appears once the time-based cache window in
 * shopifyFetch expires. With it, the next page view is already correct.
 */
function isFromShopify(rawBody: string, signature: string | null): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest();
  let received: Buffer;
  try {
    received = Buffer.from(signature, "base64");
  } catch {
    return false;
  }

  // timingSafeEqual throws on length mismatch, so guard before comparing —
  // and compare rather than string-equals so a wrong secret can't be probed
  // byte by byte via response timing.
  if (expected.length !== received.length) return false;
  return timingSafeEqual(expected, received);
}

export async function POST(request: Request) {
  // Must read the raw body: the HMAC is computed over the exact bytes Shopify
  // sent, so re-serialising parsed JSON would not match.
  const rawBody = await request.text();
  const signature = request.headers.get("x-shopify-hmac-sha256");

  if (!isFromShopify(rawBody, signature)) {
    // Deliberately terse — don't tell an unauthenticated caller whether the
    // secret is unset, the signature malformed, or simply wrong.
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // `expire: 0` rather than the "max" profile: a merchant who just changed a
  // price wants the next page view to be correct, not to be served stale
  // content once more while it refreshes behind them. The cost is one blocking
  // revalidation on the next request.
  revalidateTag(PRODUCTS_TAG, { expire: 0 });

  const topic = request.headers.get("x-shopify-topic") ?? "unknown";
  console.log(`[revalidate] ${topic} → invalidated ${PRODUCTS_TAG}`);

  return NextResponse.json({ revalidated: true, topic });
}
