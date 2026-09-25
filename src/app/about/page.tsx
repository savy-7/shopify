import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Botanical from "@/components/ui/Botanical";
import { ABOUT, FOUNDER_PHOTO, PACK_LINE, TAGLINE } from "@/lib/brand/content";

export const metadata: Metadata = {
  title: "About",
  description: TAGLINE,
};

const eyebrow = "font-numeral text-[0.66rem] uppercase tracking-[0.28em]";

export default function AboutPage() {
  const { intro, founder, journey, beginning } = ABOUT;

  return (
    <div>
      {/* 1. About Goodness Crafted */}
      <header className="mx-auto max-w-[110rem] px-5 pt-16 pb-20 sm:px-8 lg:pt-24 lg:pb-28">
        <p className={`animate-rise ${eyebrow} text-ink/45`}>About Goodness Crafted</p>
        <Botanical
          name="sprig-pair"
          className="animate-rise mt-5 h-[12px] w-[120px] text-ink/25"
          style={{ animationDelay: "40ms" }}
        />
        <div className="mt-7 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <h1
            className="animate-rise text-[2.8rem] leading-[0.95] font-semibold tracking-[-0.015em] sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "90ms" }}
          >
            Goodness,{" "}
            <span className="font-serif font-normal italic text-olive-deep">thoughtfully</span>{" "}
            crafted.
          </h1>
          <div className="animate-rise space-y-5" style={{ animationDelay: "170ms" }}>
            {intro.body.map((paragraph) => (
              <p key={paragraph} className="max-w-lg text-lg leading-relaxed text-ink/70">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </header>

      {/* 2. A note from our founder */}
      <section
        aria-labelledby="founder-heading"
        className="mx-auto max-w-[110rem] border-t border-ink/10 px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <FounderPortrait />
          </Reveal>

          <div>
            <Reveal>
              <p id="founder-heading" className={`${eyebrow} text-ink/45`}>
                A note from our founder
              </p>
              <blockquote className="mt-8 font-serif text-[1.7rem] leading-[1.25] italic text-ink sm:text-[2.1rem]">
                &ldquo;{founder.quote}&rdquo;
              </blockquote>
            </Reveal>

            <div className="mt-10 space-y-5">
              {founder.body.map((paragraph, i) => (
                <Reveal key={paragraph} delay={i * 90}>
                  <p className="max-w-2xl text-lg leading-relaxed text-ink/70">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={founder.body.length * 90} className="mt-10">
              <p className="font-serif text-2xl italic">&mdash; {founder.name}</p>
              <p className={`mt-2 ${eyebrow} text-ink/45`}>{founder.role}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Our journey */}
      <section className="relative overflow-hidden bg-almond text-paper">
        <div
          aria-hidden="true"
          className="grain-layer pointer-events-none absolute inset-0 opacity-25"
        />
        <div className="relative mx-auto grid max-w-[110rem] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:py-32">
          <Reveal>
            <p className={`${eyebrow} text-paper/45`}>Our journey</p>
            <h2 className="mt-7 font-serif text-[2.2rem] leading-[1.05] font-normal italic text-olive sm:text-[3rem]">
              {journey.heading}
            </h2>
            <Botanical name="branch" className="mt-10 h-[60px] w-[120px] text-paper/30" />
          </Reveal>

          <div className="space-y-6 lg:pt-14">
            {journey.body.map((paragraph, i) => (
              <Reveal key={paragraph} delay={i * 110}>
                <p className="max-w-2xl leading-relaxed text-paper/75 lg:text-lg">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The beginning of something good */}
      <section className="mx-auto max-w-[110rem] px-5 py-24 text-center sm:px-8 lg:py-36">
        <Reveal>
          <p className={`${eyebrow} text-ink/45`}>The beginning of something good</p>
          <Botanical name="sprig-pair" className="mx-auto mt-5 h-[13px] w-[130px] text-ink/25" />
          <h2 className="mt-9 text-[2.2rem] leading-[1.05] font-semibold tracking-[-0.012em] sm:text-5xl lg:text-6xl">
            {beginning.heading}
          </h2>
          <p className="mt-4 font-serif text-[1.6rem] italic text-ink/55 sm:text-[2.2rem]">
            {beginning.line}
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-14">
          <p className="font-display text-2xl font-semibold">Goodness Crafted</p>
          <p className={`mt-2 ${eyebrow} text-ink/45`}>{PACK_LINE}</p>
          <Link
            href="/shop"
            className="mt-10 inline-block rounded-full bg-ink px-9 py-4 font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-paper transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-[1.04]"
          >
            Shop the range
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

/**
 * Holds a 4:5 portrait slot whether or not the photograph exists yet, so the
 * layout does not shift when it arrives. Until then the slot is a quiet
 * botanical plate rather than an empty grey box.
 */
function FounderPortrait() {
  return (
    <figure className="mx-auto w-full max-w-md lg:mx-0">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-stone">
        {FOUNDER_PHOTO ? (
          <Image
            src={FOUNDER_PHOTO.src}
            alt={FOUNDER_PHOTO.alt}
            fill
            sizes="(max-width: 1024px) 90vw, 28rem"
            className="object-cover"
          />
        ) : (
          <Botanical
            name="ring"
            strokeWidth={0.8}
            className="absolute top-1/2 left-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 text-ink/20"
          />
        )}
      </div>
    </figure>
  );
}
