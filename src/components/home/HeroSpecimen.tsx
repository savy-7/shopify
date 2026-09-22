"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type Specimen = {
  handle: string;
  title: string;
  shortName: string;
  accent: string;
  /** Darkened where the graphic accent is too pale to read as type. */
  accentInk: string;
  available: boolean;
  price: string | null;
  image: { url: string; width: number; height: number; alt: string } | null;
};

const ROTATE_MS = 5200;

export default function HeroSpecimen({ specimens }: { specimens: Specimen[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const active = specimens[index];

  const select = useCallback((next: number) => {
    setIndex(((next % specimens.length) + specimens.length) % specimens.length);
  }, [specimens.length]);

  useEffect(() => {
    if (paused || specimens.length < 2) return;

    // Auto-rotation is motion the visitor did not ask for, so it stays off
    // entirely when the OS requests reduced motion.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % specimens.length),
      ROTATE_MS
    );
    return () => window.clearInterval(id);
  }, [paused, specimens.length]);

  // Left/right arrows move between specimens once the rotator has focus.
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
      className="relative overflow-hidden"
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

      {/* Blueprint rules. The composition is pinned to these, so the page reads
          as a measured sheet rather than a stack of centred boxes. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {[18, 50, 82].map((left) => (
          <span
            key={left}
            className="absolute top-0 bottom-0 hidden w-px bg-ink/[0.07] lg:block"
            style={{ left: `${left}%` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[110rem] px-5 sm:px-8">
        <div className="flex items-start justify-between gap-6 pt-10 sm:pt-14">
          <div className="max-w-xl">
            <p className="animate-rise font-numeral text-[0.66rem] uppercase tracking-[0.3em] text-ink/45">
              Goodness Crafted — India
            </p>
            <h1
              className="animate-rise mt-5 text-[2.6rem] leading-[0.92] font-extrabold tracking-[-0.035em] sm:text-6xl lg:text-[4.1rem]"
              style={{ animationDelay: "90ms" }}
            >
              Crafting{" "}
              <span className="font-serif italic" style={{ color: "var(--accent-ink)" }}>
                goodness
              </span>{" "}
              in every bite.
            </h1>
          </div>

          <div
            className="animate-rise hidden shrink-0 text-right lg:block"
            style={{ animationDelay: "180ms" }}
          >
            <p className="font-numeral text-[0.66rem] uppercase tracking-[0.22em] text-ink/40">
              Specimen
            </p>
            <p className="font-numeral text-2xl tabular-nums">
              {String(index + 1).padStart(2, "0")}
              <span className="text-ink/30">/{String(specimens.length).padStart(2, "0")}</span>
            </p>
          </div>
        </div>

        {/* Stage: the pack sits in front of its own name, so type and product
            physically interlock instead of sitting side by side. */}
        <div
          ref={stageRef}
          role="tabpanel"
          aria-live="polite"
          className="relative mt-4 flex h-[clamp(345px,52vw,560px)] items-end justify-center sm:mt-2"
        >
          <span
            key={`name-${active.handle}`}
            aria-hidden="true"
            className="animate-nameplate pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[54%] text-[clamp(4.5rem,20vw,17rem)] leading-none font-extrabold tracking-[-0.045em] whitespace-nowrap uppercase"
            style={{
              WebkitTextStroke: "clamp(1px, 0.16vw, 3px) var(--accent)",
              color: "transparent",
            }}
          >
            {active.shortName}
          </span>

          {active.image && (
            <Image
              key={`pack-${active.handle}`}
              src={active.image.url}
              alt={active.image.alt}
              width={active.image.width}
              height={active.image.height}
              priority={index === 0}
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 420px"
              className="pack-blend animate-specimen relative z-10 h-full w-auto object-contain"
            />
          )}

          {/* Leader lines, drawn outward from the pack like a parts diagram.
              Both sit clear of the nameplate's band — the giant letterforms
              occupy roughly 28–64% of the stage height, and a caption crossing
              a stroke makes each illegible. */}
          <figure className="absolute top-[16%] left-0 hidden items-center gap-3 lg:flex">
            <figcaption className="font-numeral text-[0.66rem] uppercase tracking-[0.2em] text-ink/55">
              Net wt. <span className="text-ink">250 g</span>
            </figcaption>
            <span
              key={`rule-a-${active.handle}`}
              className="animate-draw flex h-px w-[clamp(2rem,6vw,6rem)] origin-left items-center justify-end"
              style={{ background: "var(--accent)" }}
            >
              <span
                className="h-1.5 w-1.5 translate-x-1/2 rounded-full"
                style={{ background: "var(--accent)" }}
              />
            </span>
          </figure>

          <figure className="absolute top-[80%] right-0 hidden items-center gap-3 lg:flex">
            <span
              key={`rule-b-${active.handle}`}
              className="animate-draw flex h-px w-[clamp(2rem,6vw,6rem)] origin-right items-center"
              style={{ background: "var(--accent)" }}
            >
              <span
                className="h-1.5 w-1.5 -translate-x-1/2 rounded-full"
                style={{ background: "var(--accent)" }}
              />
            </span>
            <figcaption className="font-numeral text-[0.66rem] uppercase tracking-[0.2em] text-ink/55">
              100% veg
            </figcaption>
          </figure>

          <div className="absolute bottom-0 left-0 z-20 lg:bottom-6">
            <p className="font-numeral text-[0.66rem] uppercase tracking-[0.2em] text-ink/40">
              {active.price ? "From" : "Status"}
            </p>
            <p
              key={`price-${active.handle}`}
              className="animate-specimen font-numeral text-3xl font-bold tabular-nums sm:text-4xl"
              style={{ color: "var(--accent-ink)" }}
            >
              {active.price ?? "Soon"}
            </p>
            {!active.available && (
              <p className="mt-1 font-numeral text-[0.6rem] uppercase tracking-[0.2em] text-ink/40">
                Restocking
              </p>
            )}
          </div>
        </div>

        {/* Rotator. Doubles as the range overview — six packs, six colours. */}
        <div
          role="tablist"
          aria-label="Choose a product"
          onKeyDown={onKeyDown}
          className="scrollbar-none -mx-5 mt-8 flex gap-1 overflow-x-auto border-t border-ink/10 px-5 pt-3 sm:-mx-8 sm:px-8"
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

        <div className="flex flex-wrap items-center gap-x-7 gap-y-4 pt-8 pb-14 sm:pb-20">
          <Link
            href="/shop"
            className="group relative overflow-hidden rounded-full bg-ink px-8 py-4 font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-paper"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-y-100"
              style={{ background: "var(--accent-ink)" }}
            />
            <span className="relative">Shop the range</span>
          </Link>

          <Link
            href={`/products/${active.handle}`}
            className="font-numeral text-[0.7rem] uppercase tracking-[0.2em] underline decoration-ink/25 underline-offset-[7px] transition-colors hover:decoration-ink"
          >
            View {active.title}
          </Link>
        </div>
      </div>
    </section>
  );
}
