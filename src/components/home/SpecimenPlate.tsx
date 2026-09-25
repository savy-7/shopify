"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Botanical from "@/components/ui/Botanical";

export type Specimen = {
  handle: string;
  title: string;
  shortName: string;
  /** Species name for the caption; null for anything not in the brand table. */
  botanical: string | null;
  accent: string;
  /** Darkened where the graphic accent is too pale to read as type. */
  accentInk: string;
  available: boolean;
  /** Blend classes for this pack; some sources need a backdrop correction. */
  packClass: string;
  price: string | null;
  image: { url: string; width: number; height: number; alt: string } | null;
};

const ROTATE_MS = 5200;

/**
 * The range as a set of botanical plates: one pack at a time, framed by a leaf
 * ring and set in front of its own name, with a figure caption underneath the
 * way a printed plate is captioned. Crop marks at the corners carry the
 * printed-sheet idea without drawing a heavy box.
 *
 * This is a section, not the page opening — it takes an h2 and leaves the
 * primary "Shop the range" call to the opening above it.
 */
export default function SpecimenPlate({ specimens }: { specimens: Specimen[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const active = specimens[index];
  const total = String(specimens.length).padStart(2, "0");
  const figure = String(index + 1).padStart(2, "0");

  const select = useCallback(
    (next: number) => {
      setIndex(((next % specimens.length) + specimens.length) % specimens.length);
    },
    [specimens.length]
  );

  useEffect(() => {
    if (paused || specimens.length < 2) return;

    // Auto-rotation is motion the visitor did not ask for, so it stays off
    // entirely when the OS requests reduced motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % specimens.length),
      ROTATE_MS
    );
    return () => window.clearInterval(id);
  }, [paused, specimens.length]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      select(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      select(index - 1);
    }
  };

  return (
    <section
      aria-labelledby="specimens-heading"
      className="relative overflow-hidden bg-stone"
      style={{
        ["--accent" as string]: active.accent,
        ["--accent-ink" as string]: active.accentInk,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="grain-layer pointer-events-none absolute inset-0 z-30 opacity-[0.35]"
      />

      <div className="relative mx-auto max-w-[110rem] px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/45">
              The specimens
            </p>
            <Botanical name="sprig-pair" className="mt-4 h-[12px] w-[120px] text-ink/25" />
            <h2
              id="specimens-heading"
              className="mt-5 text-[2.4rem] leading-[0.95] font-semibold tracking-[-0.012em] sm:text-5xl"
            >
              The range,{" "}
              <span className="font-serif font-normal italic text-ink/45">plate by plate.</span>
            </h2>
          </div>

          <p className="font-numeral text-2xl tabular-nums" aria-live="polite">
            <span className="sr-only">Plate </span>
            {figure}
            <span className="text-ink/30">/{total}</span>
          </p>
        </div>

        {/* The plate. */}
        <div className="relative mt-12 px-2 py-10 sm:px-6 lg:mt-14 lg:py-14">
          <CropMarks />

          <div className="relative flex h-[clamp(330px,48vw,540px)] items-center justify-center">
            {/* Name first, so the ring and the pack sit in front of it. */}
            <span
              key={`name-${active.handle}`}
              aria-hidden="true"
              className="animate-nameplate pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(4.2rem,17vw,15rem)] leading-none font-normal whitespace-nowrap italic"
              style={{
                WebkitTextStroke: "clamp(1px, 0.12vw, 2px) var(--accent)",
                color: "transparent",
              }}
            >
              {active.shortName}
            </span>

            <Botanical
              name="ring"
              strokeWidth={0.9}
              className="pointer-events-none absolute top-1/2 left-1/2 aspect-square h-[96%] -translate-x-1/2 -translate-y-1/2 animate-[seal-turn_70s_linear_infinite] transition-colors duration-700"
              style={{ color: "var(--accent)" }}
            />

            {active.image && (
              // No z-index here: it would make this link its own stacking
              // context, and the pack's multiply blend would then have
              // nothing behind it to blend with — a white box. DOM order
              // alone keeps it above the name and the ring.
              <Link
                href={`/products/${active.handle}`}
                className="relative h-[76%]"
                aria-label={`View ${active.title}`}
              >
                <Image
                  key={`pack-${active.handle}`}
                  src={active.image.url}
                  alt={active.image.alt}
                  width={active.image.width}
                  height={active.image.height}
                  sizes="(max-width: 640px) 55vw, (max-width: 1024px) 35vw, 340px"
                  className={`${active.packClass} animate-specimen h-full w-auto object-contain transition-transform duration-500 ease-[var(--ease-brand)] hover:-translate-y-2`}
                />
              </Link>
            )}

            {/* Plate annotations, clear of the centre so they never cross the
                letterforms of the name behind the pack. */}
            <p className="absolute top-2 left-0 hidden font-numeral text-[0.62rem] uppercase tracking-[0.2em] text-ink/50 lg:block">
              Net wt. <span className="text-ink">250 g</span>
            </p>
            <p className="absolute top-2 right-0 hidden font-numeral text-[0.62rem] uppercase tracking-[0.2em] text-ink/50 lg:block">
              100% veg
            </p>

            <ArrowButton direction="prev" onClick={() => select(index - 1)} />
            <ArrowButton direction="next" onClick={() => select(index + 1)} />
          </div>

          {/* Figure caption. */}
          <div
            key={`caption-${active.handle}`}
            className="animate-rise mt-8 flex flex-col items-center text-center"
          >
            <p className="font-numeral text-[0.62rem] uppercase tracking-[0.28em] text-ink/40">
              Fig. {figure} — {active.shortName}
            </p>
            {active.botanical && (
              <p className="mt-3 font-serif text-xl italic text-ink/70 sm:text-2xl">
                {active.botanical}
              </p>
            )}
            <div className="mt-4 flex items-center gap-5">
              <p
                className="font-numeral text-lg tabular-nums"
                style={{ color: "var(--accent-ink)" }}
              >
                {active.price ?? "Price soon"}
              </p>
              {!active.available && (
                <p className="font-numeral text-[0.6rem] uppercase tracking-[0.2em] text-ink/40">
                  Restocking
                </p>
              )}
              <span aria-hidden="true" className="h-3 w-px bg-ink/20" />
              <Link
                href={`/products/${active.handle}`}
                className="font-numeral text-[0.66rem] uppercase tracking-[0.2em] underline decoration-ink/25 underline-offset-[7px] transition-colors hover:decoration-ink"
              >
                View product
              </Link>
            </div>
          </div>
        </div>

        {/* Index of plates. */}
        <div
          role="tablist"
          aria-label="Choose a product"
          onKeyDown={onKeyDown}
          className="scrollbar-none -mx-5 mt-10 flex gap-1 overflow-x-auto border-t border-ink/10 px-5 pt-3 sm:-mx-8 sm:justify-center sm:px-8"
        >
          {specimens.map((specimen, i) => {
            const isActive = i === index;
            return (
              <button
                key={specimen.handle}
                role="tab"
                aria-selected={isActive}
                onClick={() => select(i)}
                className="group flex shrink-0 items-center gap-2.5 rounded-full px-3.5 py-2 transition-colors hover:bg-ink/[0.04]"
              >
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full transition-transform duration-500 ease-[var(--ease-brand)]"
                  style={{
                    background: specimen.accent,
                    transform: isActive ? "scale(1.5)" : "scale(1)",
                  }}
                />
                <span
                  className={`font-numeral text-[0.68rem] uppercase tracking-[0.18em] transition-colors ${
                    isActive ? "text-ink" : "text-ink/40 group-hover:text-ink/70"
                  }`}
                >
                  {specimen.shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Printer's crop marks at the four corners of the plate. */
function CropMarks() {
  const corners = [
    "top-0 left-0 border-t border-l",
    "top-0 right-0 border-t border-r",
    "bottom-0 left-0 border-b border-l",
    "bottom-0 right-0 border-b border-r",
  ];
  return (
    <>
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`pointer-events-none absolute h-6 w-6 border-ink/25 ${position}`}
        />
      ))}
    </>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Previous product" : "Next product"}
      className={`absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/20 bg-stone/80 text-ink/70 backdrop-blur-sm transition-colors hover:border-ink hover:text-ink ${
        isPrev ? "left-0" : "right-0"
      }`}
    >
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className={`h-4 w-4 ${isPrev ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </button>
  );
}
