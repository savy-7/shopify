import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { FOUNDER_MESSAGE, PHILOSOPHY, TAGLINE } from "@/lib/brand/content";

export const metadata: Metadata = {
  title: "About",
  description: TAGLINE,
};

export default function AboutPage() {
  return (
    <div>
      <header className="mx-auto max-w-[110rem] px-5 py-16 sm:px-8 lg:py-24">
        <p className="animate-rise font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/45">
          Founder&rsquo;s message
        </p>
        <h1
          className="animate-rise mt-6 max-w-4xl text-[2.8rem] leading-[0.92] font-extrabold tracking-[-0.04em] sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "90ms" }}
        >
          Goodness,{" "}
          <span className="font-serif font-normal italic text-ink/45">thoughtfully</span>{" "}
          crafted.
        </h1>
      </header>

      <section className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        {FOUNDER_MESSAGE.map((paragraph, i) => (
          <Reveal key={i} delay={i * 100}>
            <p className="mb-6 text-lg leading-relaxed text-ink/70">{paragraph}</p>
          </Reveal>
        ))}
      </section>

      <section className="bg-almond text-paper">
        <div className="mx-auto max-w-[110rem] px-5 py-24 sm:px-8 lg:py-32">
          <Reveal>
            <p className="font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-paper/45">
              Our philosophy
            </p>
          </Reveal>

          <ol className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-8">
            {PHILOSOPHY.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 130}>
                <p className="font-numeral text-[0.66rem] tracking-[0.2em] text-lime">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-5 text-2xl font-bold tracking-[-0.02em]">{item.title}</h2>
                <p className="mt-4 max-w-xs leading-relaxed text-paper/65">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
