import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { ADDRESS, SOCIALS } from "@/lib/brand/content";

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
        <h1
          className="animate-rise mt-6 text-[2.8rem] leading-[0.92] font-semibold tracking-[-0.015em] sm:text-6xl"
          style={{ animationDelay: "90ms" }}
        >
          Say <span className="font-serif font-normal italic text-ink/45">hello.</span>
        </h1>
      </header>

      <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:gap-20">
        <Reveal>
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

        <Reveal delay={120}>
          <h2 className="font-numeral text-[0.66rem] uppercase tracking-[0.22em] text-ink/45">
            Find us
          </h2>
          <ul className="mt-6 space-y-2 text-lg text-ink/75">
            {SOCIALS.map((platform) => (
              <li key={platform}>{platform}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink/40">
            Social profile links and a support email address still need to be
            added — they aren&rsquo;t published on the current site.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
