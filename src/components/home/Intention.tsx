import Reveal from "@/components/ui/Reveal";
import { INTRO, PILLARS } from "@/lib/brand/content";

export default function Intention() {
  return (
    <section className="mx-auto max-w-[110rem] px-5 py-24 sm:px-8 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/45">
            Crafted with intention
          </p>
          <h2 className="mt-6 text-[2.4rem] leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">
            Good food doesn&rsquo;t need to be{" "}
            <span className="font-serif font-normal italic text-ink/45">complicated.</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="max-w-xl text-lg leading-relaxed text-ink/70 lg:text-xl">{INTRO}</p>
        </Reveal>
      </div>

      <ol className="mt-20 grid gap-px border-t border-ink/10 sm:grid-cols-3">
        {PILLARS.map((pillar, i) => (
          <Reveal as="li" key={pillar.title} delay={i * 140} className="pt-7 sm:pr-8">
            <p className="font-numeral text-[0.66rem] tracking-[0.2em] text-ink/30">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-5 text-xl font-bold tracking-[-0.02em]">{pillar.title}</h3>
            <p className="mt-3 max-w-xs leading-relaxed text-ink/60">{pillar.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
