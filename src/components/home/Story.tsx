import Reveal from "@/components/ui/Reveal";
import Botanical from "@/components/ui/Botanical";
import { PHILOSOPHY, STORY } from "@/lib/brand/content";

/**
 * The one dark beat in the page: the brand's story, then its philosophy.
 * Deliberately carries no pack shot: the product images have an opaque
 * near-white backdrop that only drops out over light surfaces, so a pack here
 * would arrive in a white box.
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
            <h2 className="mt-7 text-[2.2rem] leading-[1.02] font-normal tracking-[-0.01em] sm:text-[3rem]">
              <span className="font-serif italic text-olive">{STORY.heading}</span>
            </h2>
            <Botanical name="sprig-pair" className="mt-9 h-[13px] w-[130px] text-olive" />
          </Reveal>

          <div className="space-y-6 lg:pt-14">
            {STORY.body.map((paragraph, i) => (
              <Reveal key={i} delay={i * 110}>
                <p className="max-w-2xl leading-relaxed text-paper/75 lg:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24 border-t border-paper/15 pt-14 lg:mt-32">
          <Reveal>
            <p className="font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-paper/45">
              Our philosophy
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-12 sm:grid-cols-3 sm:gap-8">
            {PHILOSOPHY.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 130}>
                <p className="font-numeral text-[0.66rem] tracking-[0.2em] text-olive">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.008em]">{item.title}</h3>
                <p className="mt-4 max-w-xs leading-relaxed text-paper/65">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
