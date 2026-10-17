"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { joinHamperWaitlist, type WaitlistState } from "@/app/gifting/actions";

const INITIAL: WaitlistState = { status: "idle", message: "" };

function SubmitButton({ dark }: { dark: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`shrink-0 rounded-full px-7 py-3.5 font-numeral text-[0.68rem] uppercase tracking-[0.2em] transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-[1.04] disabled:opacity-60 ${
        dark ? "bg-paper text-ink" : "bg-ink text-paper"
      }`}
    >
      {pending ? "Adding…" : "Notify me"}
    </button>
  );
}

/**
 * Email capture for the hampers that aren't on sale yet. `dark` flips it for
 * the olive panel on the homepage; the gifting page uses the light default.
 */
export default function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [state, formAction] = useActionState(joinHamperWaitlist, INITIAL);

  return (
    <div className={dark ? "text-paper" : ""}>
      <form action={formAction} className="flex flex-wrap items-center gap-3">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={`min-w-0 flex-1 rounded-full border px-5 py-3.5 text-sm outline-none transition-colors ${
            dark
              ? "border-paper/30 bg-paper/10 text-paper placeholder:text-paper/50 focus:border-paper/70"
              : "border-ink/20 bg-paper text-ink placeholder:text-ink/35 focus:border-ink/60"
          }`}
        />
        {/* Honeypot: hidden from people, irresistible to bots. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
        />
        <SubmitButton dark={dark} />
      </form>

      <p
        aria-live="polite"
        className={`mt-3 text-sm ${
          state.status === "error"
            ? dark
              ? "text-paper"
              : "text-mix"
            : dark
              ? "text-paper/80"
              : "text-ink/60"
        }`}
      >
        {state.message ||
          "We'll only email you about the hampers — nothing else, and you can opt out any time."}
      </p>
    </div>
  );
}
