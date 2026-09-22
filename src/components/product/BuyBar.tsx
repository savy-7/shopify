"use client";

import { useState } from "react";

/**
 * Quantity stepper plus a direct-to-checkout link.
 *
 * The URL is rebuilt as quantity changes rather than posting anywhere, so this
 * works without JavaScript state on the server and degrades to a plain link.
 */
export default function BuyBar({
  permalinkBase,
  available,
  accentInk,
}: {
  /** `https://{domain}/cart/{numericVariantId}` — quantity is appended here. */
  permalinkBase: string;
  available: boolean;
  accentInk: string;
}) {
  const [quantity, setQuantity] = useState(1);

  if (!available) {
    return (
      <div className="mt-9 rounded-full border border-ink/15 px-7 py-4 text-center font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-ink/45">
        Currently restocking
      </div>
    );
  }

  return (
    <div className="mt-9 flex flex-wrap items-center gap-4">
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

      <a
        href={`${permalinkBase}:${quantity}`}
        className="group relative flex-1 overflow-hidden rounded-full bg-ink px-9 py-4 text-center font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-paper"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-y-100"
          style={{ background: accentInk }}
        />
        <span className="relative">Buy now</span>
      </a>
    </div>
  );
}
