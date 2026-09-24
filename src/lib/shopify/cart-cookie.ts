/**
 * Name of the cookie that stores the visitor's Shopify cart id.
 *
 * Shared between `src/app/cart/actions.ts` (which sets it — a Server Actions
 * file can only export async functions, so the constant can't live there) and
 * `src/app/layout.tsx` (which reads it to fetch the initial cart server-side).
 */
export const CART_COOKIE_NAME = "gc_cart_id";
export const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
