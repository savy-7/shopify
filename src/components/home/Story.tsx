import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Botanical from "@/components/ui/Botanical";
import { FOUNDER_MESSAGE, PROMISE } from "@/lib/brand/content";

/**
 * The one dark beat in the page. Deliberately carries no pack shot: the product
 * images have an opaque near-white backdrop that only drops out over light
 * surfaces, so a pack here would arrive in a white box.
 */
export default function Story() {
  return (
    <section className="relative overflow-hidden bg-almond text-paper">
      <div
        aria-hidden="true"
        className="grain-layer pointer-events-none absolute inset-0 opacity-25"
      />

      <div className="relative mx-auto max-w-[110rem] px-5 py-24 sm:px-8 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <Reveal>
            <p className="font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-paper/45">
              From us to you
            </p>
            <blockquote className="mt-7 text-[2rem] leading-[1.05] font-semibold tracking-[-0.005em] sm:text-[2.6rem]">
              <span className="font-serif font-normal italic text-olive">
                {PROMISE}
              </span>
            </blockquote>
            <Botanical name="sprig-pair" className="mt-9 h-[13px] w-[130px] text-olive" />
          </Reveal>

          <div className="space-y-6">
            {FOUNDER_MESSAGE.map((paragraph, i) => (
              <Reveal key={i} delay={i * 110}>
                <p className="max-w-2xl leading-relaxed text-paper/75 lg:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={FOUNDER_MESSAGE.length * 110}>
              <Link
                href="/about"
                className="mt-4 inline-block font-numeral text-[0.68rem] uppercase tracking-[0.2em] text-paper underline decoration-paper/30 underline-offset-[7px] transition-colors hover:decoration-olive"
              >
                Read our philosophy
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
