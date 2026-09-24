"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { ShopifyImage } from "@/lib/shopify/types";
import { packClassName } from "@/lib/brand/palette";

/**
 * Single-frame image slider for the product page.
 *
 * Built on a scroll-snap track rather than a transform carousel: native
 * horizontal scrolling gives touch swipe, trackpad swipe, and keyboard
 * scrolling for free, and it degrades to a plain scrollable row if
 * JavaScript never runs. The arrows and dots drive `scrollTo` on that same
 * track, so both input paths stay in sync with one source of truth.
 */
export default function ProductGallery({
  images,
  handle,
  title,
  accent,
}: {
  images: ShopifyImage[];
  handle: string;
  title: string;
  accent: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(images.length - 1, index));
    track.scrollTo({ left: track.clientWidth * clamped, behavior: "smooth" });
  };

  // Derive the active slide from scroll position rather than tracking it
  // separately, so dragging the track by hand keeps the dots honest.
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== active) setActive(index);
  };

  if (images.length === 0) return null;

  return (
    <div className="lg:sticky lg:top-24 lg:h-fit">
      <div
        className="relative overflow-hidden rounded-[2rem]"
        style={{ backgroundColor: `color-mix(in oklab, ${accent} 9%, var(--color-paper))` }}
      >
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto"
        >
          {images.map((image, i) => (
            <div
              key={image.url}
              className="flex aspect-square w-full shrink-0 snap-center items-center justify-center p-8"
            >
              <Image
                src={image.url}
                alt={image.altText ?? `${title} — view ${i + 1}`}
                width={image.width}
                height={image.height}
                priority={i === 0}
                sizes="(max-width: 1024px) 92vw, 44vw"
                className={`${packClassName(handle)} max-h-full w-auto object-contain`}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => scrollToIndex(active - 1)}
              disabled={active === 0}
              aria-label="Previous image"
              className="absolute top-1/2 left-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/80 backdrop-blur-sm transition-opacity hover:bg-paper disabled:pointer-events-none disabled:opacity-0"
            >
              &#8249;
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(active + 1)}
              disabled={active === images.length - 1}
              aria-label="Next image"
              className="absolute top-1/2 right-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/80 backdrop-blur-sm transition-opacity hover:bg-paper disabled:pointer-events-none disabled:opacity-0"
            >
              &#8250;
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2.5">
          {images.map((image, i) => (
            <button
              key={image.url}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className="group p-1.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 ease-[var(--ease-brand)] ${
                  i === active ? "w-7" : "w-1.5 bg-ink/20 group-hover:bg-ink/40"
                }`}
                style={i === active ? { backgroundColor: accent } : undefined}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
