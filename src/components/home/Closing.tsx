import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { CLOSING, PACK_LINE } from "@/lib/brand/content";

export default function Closing() {
  return (
    <section className="mx-auto max-w-[110rem] px-5 py-24 sm:px-8 lg:py-36">
      <Reveal className="mx-auto max-w-4xl text-center">
        <p className="font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/40">
          {PACK_LINE}
        </p>
        <p className="mt-9 text-[1.8rem] leading-[1.15] font-semibold tracking-[-0.005em] text-balance sm:text-[2.6rem] lg:text-[3.1rem]">
          {CLOSING}
        </p>
      </Reveal>

      <Reveal delay={150} className="mt-12 flex justify-center">
        <Link
          href="/shop"
          className="rounded-full bg-ink px-9 py-4 font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-paper transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-[1.04]"
        >
          Shop the range
        </Link>
      </Reveal>
    </section>
  );
}
