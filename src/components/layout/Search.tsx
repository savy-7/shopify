"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Result = {
  handle: string;
  title: string;
  shortName: string;
  accent: string;
  packClass: string;
  image: { url: string; width: number; height: number; altText: string | null } | null;
  price: string | null;
  availableForSale: boolean;
};

/**
 * The whole catalogue is small enough to fetch once and filter in the
 * browser — no per-keystroke request, and results appear the instant you
 * stop typing. The list is fetched lazily, only once the panel is first
 * opened, so it costs nothing on pages where search is never used.
 */
export default function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [all, setAll] = useState<Result[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || all !== null || loadError) return;
    let cancelled = false;

    fetch("/api/search")
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.json();
      })
      .then((data: { results: Result[] }) => {
        if (!cancelled) setAll(data.results);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [open, all, loadError]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const trimmed = query.trim().toLowerCase();
  const results =
    trimmed && all ? all.filter((p) => p.title.toLowerCase().includes(trimmed)) : [];

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={panelRef} className="relative">
      <button
        type="button"
        aria-label={open ? "Close search" : "Search products"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 transition-colors hover:border-ink/40"
      >
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {open ? <path d="M5 5l10 10M15 5 5 15" /> : <><circle cx="8.5" cy="8.5" r="6" /><path d="m17 17-4-4" /></>}
        </svg>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+0.75rem)] right-0 z-50 w-[min(92vw,24rem)] rounded-2xl border border-ink/10 bg-paper shadow-2xl">
          <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-ink/40"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8.5" cy="8.5" r="6" />
              <path d="m17 17-4-4" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/35"
            />
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {!trimmed ? (
              <p className="px-3 py-6 text-center text-sm text-ink/40">
                Start typing to find a product.
              </p>
            ) : loadError ? (
              <p className="px-3 py-6 text-center text-sm text-ink/40">
                Search is temporarily unavailable.
              </p>
            ) : all === null ? (
              <p className="px-3 py-6 text-center text-sm text-ink/40">Loading…</p>
            ) : results.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-ink/40">
                No products match &ldquo;{query.trim()}&rdquo;.
              </p>
            ) : (
              <ul>
                {results.map((product) => (
                  <li key={product.handle}>
                    <Link
                      href={`/products/${product.handle}`}
                      onClick={close}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-ink/[0.04]"
                    >
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg"
                        style={{
                          backgroundColor: `color-mix(in oklab, ${product.accent} 9%, var(--color-paper))`,
                        }}
                      >
                        {product.image && (
                          <Image
                            src={product.image.url}
                            alt=""
                            width={product.image.width}
                            height={product.image.height}
                            sizes="48px"
                            className={`${product.packClass} h-[86%] w-auto object-contain`}
                          />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-sm font-semibold">
                          {product.title}
                        </span>
                        <span className="mt-0.5 block font-numeral text-xs text-ink/45">
                          {product.availableForSale
                            ? (product.price ?? "Soon")
                            : "Restocking"}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link
            href="/shop"
            onClick={close}
            className="block border-t border-ink/10 px-5 py-3.5 text-center font-numeral text-[0.66rem] uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-ink"
          >
            View all products
          </Link>
        </div>
      )}
    </div>
  );
}
