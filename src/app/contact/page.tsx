import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import Botanical from "@/components/ui/Botanical";
import AvailableOn from "@/components/ui/AvailableOn";
import InstagramGlyph from "@/components/ui/InstagramGlyph";
import { ADDRESS, INSTAGRAM, SUPPORT_EMAIL } from "@/lib/brand/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Goodness Crafted.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[110rem] px-5 py-16 sm:px-8 lg:py-24">
      <header className="border-b border-ink/10 pb-10">
        <p className="animate-rise font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/45">
          Contact
        </p>
        <Botanical
          name="sprig-pair"
          className="animate-rise mt-5 h-[12px] w-[120px] text-ink/25"
          style={{ animationDelay: "40ms" }}
        />
        <h1
          className="animate-rise mt-6 text-[2.8rem] leading-[0.92] font-semibold tracking-[-0.015em] sm:text-6xl"
          style={{ animationDelay: "90ms" }}
        >
          Say <span className="font-serif font-normal italic text-ink/45">hello.</span>
        </h1>
      </header>

      <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
        <Reveal>
          <h2 className="font-numeral text-[0.66rem] uppercase tracking-[0.22em] text-ink/45">
            Customer support
          </h2>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="mt-6 inline-block text-lg text-ink/75 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            {SUPPORT_EMAIL}
          </a>
        </Reveal>

        <Reveal delay={90}>
          <h2 className="font-numeral text-[0.66rem] uppercase tracking-[0.22em] text-ink/45">
            Registered address
          </h2>
          <address className="mt-6 text-lg leading-relaxed text-ink/75 not-italic">
            {ADDRESS.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </Reveal>

        <Reveal delay={180}>
          <h2 className="font-numeral text-[0.66rem] uppercase tracking-[0.22em] text-ink/45">
            Find us
          </h2>
          <a
            href={INSTAGRAM.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2.5 text-lg text-ink/75 transition-colors hover:text-ink"
          >
            <InstagramGlyph className="h-5 w-5" />
            {INSTAGRAM.handle}
          </a>
        </Reveal>
      </div>

      <Reveal delay={240} className="mt-16 border-t border-ink/10 pt-12">
        <AvailableOn />
      </Reveal>
    </div>
  );
}
