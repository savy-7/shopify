import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Gifting & Hampers",
  description:
    "Curated combinations of the Goodness Crafted range, boxed as gift sets. Coming soon.",
};

/**
 * Placeholder. The hamper SKUs are archived in Shopify pending relaunch as
 * multi-pack sets, so there is nothing real to list yet and nothing is invented.
 */
export default function GiftingPage() {
  return (
    <div className="mx-auto max-w-[110rem] px-5 py-16 sm:px-8 lg:py-24">
      <header className="border-b border-ink/10 pb-10">
        <p className="animate-rise font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/45">
          In preparation
        </p>
        <h1
          className="animate-rise mt-6 max-w-3xl text-[2.8rem] leading-[0.92] font-extrabold tracking-[-0.04em] sm:text-6xl"
          style={{ animationDelay: "90ms" }}
        >
          Gifting &amp;{" "}
          <span className="font-serif font-normal italic text-ink/45">hampers.</span>
        </h1>
      </header>

      <Reveal className="mt-14 max-w-xl">
        <p className="text-lg leading-relaxed text-ink/70">
          We&rsquo;re putting together curated combinations of the range, boxed
          as gift sets. They aren&rsquo;t ready to order yet.
        </p>
        <p className="mt-5 leading-relaxed text-ink/55">
          In the meantime, every pack in the range makes a good gift on its own.
        </p>

        <Link
          href="/shop"
          className="mt-10 inline-block rounded-full bg-ink px-8 py-4 font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-paper transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-[1.04]"
        >
          Shop the range
        </Link>
      </Reveal>
    </div>
  );
}
