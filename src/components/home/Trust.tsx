import Reveal from "@/components/ui/Reveal";
import Botanical from "@/components/ui/Botanical";
import { TRUST } from "@/lib/brand/content";

/**
 * Reassurance at the point of purchase: placed straight after the range, where
 * a visitor is deciding whether to add to cart.
 *
 * Customer reviews belong here once real ones exist. None are shown until
 * then — placeholder stars would be a claim the brand can't back.
 */

// Drawn in the same 24-unit, round-capped line style as NutIcon.
const ICONS: React.ReactNode[] = [
  // Carefully selected: a leaf under a loupe.
  <>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.3 15.3 5.2 5.2" />
    <path d="M8 13c0-3.2 1.8-5.2 5-5.4-.1 3.3-2 5.3-5 5.4Z" />
  </>,
  // Thoughtfully packed: a zip-top pouch.
  <>
    <path d="M6 4.5h12l-.6 15.2a1.6 1.6 0 0 1-1.6 1.5H8.2a1.6 1.6 0 0 1-1.6-1.5L6 4.5Z" />
    <path d="M6.2 8h11.6" />
    <path d="M10 12.5c.8 1 3.2 1 4 0" />
  </>,
  // 100% vegetarian: the Indian veg mark, a dot inside a square.
  <>
    <rect x="4" y="4" width="16" height="16" rx="1.5" />
    <circle cx="12" cy="12" r="3.6" fill="currentColor" stroke="none" />
  </>,
  // Secure payments: a padlock.
  <>
    <rect x="5" y="10.5" width="14" height="10" rx="2" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    <path d="M12 14.5v2.4" />
  </>,
];

export default function Trust() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="mx-auto max-w-[110rem] px-5 pb-24 sm:px-8 lg:pb-32"
    >
      <div className="rounded-[2rem] bg-stone px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        <Reveal className="text-center">
          <p className="font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/45">
            Our promise
          </p>
          <Botanical name="sprig-pair" className="mx-auto mt-4 h-[12px] w-[120px] text-ink/25" />
          <h2
            id="trust-heading"
            className="mt-5 text-[2.1rem] leading-[1] font-semibold tracking-[-0.012em] sm:text-[2.8rem]"
          >
            Why shop{" "}
            <span className="font-serif font-normal italic text-olive-deep">
              Goodness Crafted?
            </span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {TRUST.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 110}
              className="flex flex-col items-center text-center lg:border-l lg:border-ink/10 lg:first:border-l-0 lg:px-4"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper text-olive-deep">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {ICONS[i]}
                </svg>
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.008em]">{item.title}</h3>
              <p className="mt-2 max-w-[15rem] leading-relaxed text-ink/60">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
