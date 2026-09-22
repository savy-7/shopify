import type { Money } from "./shopify/types";

/**
 * Locale is pinned rather than inferred so server and client render the same
 * string — a mismatch here is a classic hydration error.
 */
export function formatMoney({ amount, currencyCode }: Money): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(Number(amount));
}
