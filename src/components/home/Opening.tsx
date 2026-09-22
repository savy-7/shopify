import Image from "next/image";
import Link from "next/link";
import { ACCENT_HEX } from "@/lib/brand/palette";
import { MISSION } from "@/lib/brand/content";
import NutIcon, { type NutIconName } from "@/components/ui/NutIcon";
import RotatingSeal from "@/components/ui/RotatingSeal";

/**
 * Icons set around the headline. Hand-placed rather than distributed evenly —
 * an even ring reads as a loading spinner. Each drifts on its own delay so the
 * group never pulses in unison.
 */
const FLOATERS: {
  name: NutIconName;
  accent: keyof typeof ACCENT_HEX;
  className: string;
  tilt: number;
  delay: number;
}[] = [
  // The headline runs to roughly 70% of the container width, so the icons stay
  // inside the right-hand third. Three rather than four: four crowded the gap
  // and the fourth landed on top of "crafted."
  { name: "almond", accent: "almond", className: "right-[21%] top-[10%] h-10 w-10", tilt: -14, delay: 0 },
  { name: "pistachio", accent: "pistachio", className: "right-[5%] top-[44%] h-11 w-11", tilt: 12, delay: 900 },
  { name: "cashew", accent: "mix", className: "right-[16%] bottom-[6%] h-12 w-12", tilt: 8, delay: 1800 },
];

/**
 * Page opening: brand line, then the studio banner at full width.
 *
 * The banner is 2.5:1. An earlier version cropped it into a portrait arch,
 * which showed barely a fifth of the scene — it only works edge to edge at its
 * own aspect ratio, so nothing is cut. Its native 1489px covers a desktop
 * viewport almost exactly.
 *
 * It already shows all six packs, so it replaces the separate pack shelf that
 * used to sit here rather than repeating it.
 *
 * Everything is above the fold, so entrances run on load rather than on scroll,
 * with delays offset past the intro curtain so the sequence continues where it
 * ends.
 */
export default function Opening() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grain-layer pointer-events-none absolute inset-0 z-30 opacity-[0.35]"
      />

      <div className="relative mx-auto w-full max-w-[110rem] px-5 pt-12 sm:px-8 lg:pt-16">
        <div className="flex items-start justify-between gap-8">
          <p
            className="animate-rise font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/45"
            style={{ animationDelay: "780ms" }}
          >
            Est. India — Nuts, dry fruits &amp; blends
          </p>

          <RotatingSeal
            className="animate-rise hidden h-24 w-24 shrink-0 sm:block lg:h-28 lg:w-28"
            style={{ animationDelay: "1500ms" }}
          />
        </div>

        {/* Two lines, the second deliberately long, so the block reaches across
            the page instead of leaving a column of dead space beside it. */}
        <h1 className="relative mt-4 text-[clamp(2.7rem,8.4vw,7.2rem)] leading-[0.9] font-extrabold tracking-[-0.045em] lg:-mt-4">
          <span className="animate-rise block" style={{ animationDelay: "880ms" }}>
            Goodness,
          </span>
          <span className="animate-rise block" style={{ animationDelay: "990ms" }}>
            <span className="font-serif text-[0.96em] font-normal italic text-ink/45">
              thoughtfully
            </span>{" "}
            {/* Outlined, echoing the specimen nameplate below — the two sections
                share one typographic device, not two unrelated ones. */}
            <span
              style={{
                WebkitTextStroke: "clamp(1px, 0.12vw, 2px) var(--color-ink)",
                color: "transparent",
              }}
            >
              crafted.
            </span>
          </span>

          {FLOATERS.map((floater) => (
            <span
              key={floater.name}
              aria-hidden="true"
              className={`animate-rise pointer-events-none absolute hidden lg:block ${floater.className}`}
              style={{ animationDelay: `${1450 + floater.delay / 6}ms` }}
            >
              <span
                className="animate-drift block h-full w-full"
                style={{
                  ["--drift-tilt" as string]: `${floater.tilt}deg`,
                  animationDelay: `${floater.delay}ms`,
                  color: ACCENT_HEX[floater.accent],
                }}
              >
                <NutIcon name={floater.name} className="h-full w-full" strokeWidth={1.3} />
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-9 flex flex-wrap items-end justify-between gap-x-10 gap-y-7">
          <p
            className="animate-rise max-w-md text-lg leading-relaxed text-ink/65"
            style={{ animationDelay: "1210ms" }}
          >
            {MISSION}
          </p>

          <div
            className="animate-rise flex flex-wrap items-center gap-6"
            style={{ animationDelay: "1300ms" }}
          >
            <Link
              href="/shop"
              className="rounded-full bg-ink px-8 py-4 font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-paper transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-[1.04]"
            >
              Shop the range
            </Link>
            <Link
              href="/about"
              className="font-numeral text-[0.7rem] uppercase tracking-[0.2em] underline decoration-ink/25 underline-offset-[7px] transition-colors hover:decoration-ink"
            >
              Our story
            </Link>
          </div>
        </div>
      </div>

      {/* Full bleed, at the banner's own ratio so the whole scene is visible. */}
      <Link
        href="/shop"
        aria-label="Shop the range"
        className="group mt-12 block w-full overflow-hidden lg:mt-14"
        style={{ animation: "unveil 1.15s var(--ease-brand) 0.75s both" }}
      >
        <div className="relative aspect-[1489/596] w-full">
          <Image
            src="/brand/brand-banner.webp"
            alt="The Goodness Crafted range — nuts and seeds mix, cashews, almonds, green raisins, dates and pistachios, with bowls and olive branches"
            fill
            priority
            sizes="100vw"
            className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-brand)] group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <p
        className="animate-rise mx-auto flex max-w-[110rem] items-center justify-end gap-3 px-5 pt-6 font-numeral text-[0.6rem] uppercase tracking-[0.28em] text-ink/35 sm:px-8"
        style={{ animationDelay: "2000ms" }}
      >
        Scroll
        <span className="h-px w-12 bg-ink/20" />
      </p>
    </section>
  );
}
