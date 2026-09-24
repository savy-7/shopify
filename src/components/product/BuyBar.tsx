"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

/**
 * Quantity stepper plus an add-to-cart button. Adding opens the cart drawer,
 * which is the confirmation — no separate "Added!" state needed.
 */
export default function BuyBar({
  variantId,
  available,
  accentInk,
}: {
  variantId: string;
  available: boolean;
  accentInk: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, isPending, error } = useCart();

  if (!available) {
    return (
      <div className="mt-9 rounded-full border border-ink/15 px-7 py-4 text-center font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-ink/45">
        Currently restocking
      </div>
    );
  }

  return (
    <div className="mt-9">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1 rounded-full border border-ink/15 p-1.5">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity === 1}
            aria-label="Decrease quantity"
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors hover:bg-ink/5 disabled:opacity-30"
          >
            &minus;
          </button>
          <span
            aria-live="polite"
            className="w-9 text-center font-numeral text-sm tabular-nums"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(20, q + 1))}
            disabled={quantity === 20}
            aria-label="Increase quantity"
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors hover:bg-ink/5 disabled:opacity-30"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => addItem(variantId, quantity)}
          disabled={isPending}
          className="group relative flex-1 overflow-hidden rounded-full bg-ink px-9 py-4 text-center font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-paper disabled:opacity-60"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-y-100"
            style={{ background: accentInk }}
          />
          <span className="relative">{isPending ? "Adding…" : "Add to cart"}</span>
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-mix">{error}</p>}
    </div>
  );
}
