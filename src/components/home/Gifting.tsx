import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

/**
 * Placeholder for the hamper/combo range. These are the four archived SKUs,
 * to be relaunched as multi-pack gift sets — nothing is wired to Shopify yet,
 * so the section states that plainly rather than showing fake products.
 */
export default function Gifting() {
  return (
    <section className="relative overflow-hidden bg-lime text-ink">
      <div
        aria-hidden="true"
        className="grain-layer pointer-events-none absolute inset-0 opacity-30"
      />

      <div className="relative mx-auto max-w-[110rem] px-5 py-20 sm:px-8 lg:py-28">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/55">
              In preparation
            </p>
            <h2 className="mt-6 max-w-3xl text-[2.4rem] leading-[0.95] font-extrabold tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">
              Gifting &amp;{" "}
              <span className="font-serif font-normal italic">hampers</span>, coming soon.
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-ink/70">
              Curated combinations of the range, boxed as gift sets. We&rsquo;re
              putting them together now.
            </p>
          </Reveal>

          <Reveal delay={140} className="shrink-0">
            <Link
              href="/gifting"
              className="inline-block rounded-full bg-ink px-8 py-4 font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-paper transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-[1.04]"
            >
              Register interest
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
