import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/session";
import { getCustomerAccount } from "@/lib/shopify/customer-account";
import { formatMoney } from "@/lib/format";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Your account" };

export default async function AccountPage({ searchParams }: PageProps<"/account">) {
  const { error } = await searchParams;
  const session = await readSession();

  if (session.status === "signed-out") {
    return <SignedOut notConfigured={error === "not_configured"} />;
  }

  if (session.status === "expired") {
    // Can't refresh from here — a Server Component can't set cookies mid
    // render. This redirect does the refresh and sends the visitor straight
    // back once it's done.
    redirect("/api/auth/refresh?next=/account");
  }

  const result = await getCustomerAccount(session.accessToken);

  if (!result.ok) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
        <p className="text-ink/60">
          We couldn&rsquo;t load your account right now. Please try again shortly.
        </p>
        {/* Shopify's own error text — safe to show, no secrets in it — so
            this is diagnosable without needing to read server logs. */}
        <p className="mt-3 font-numeral text-xs text-ink/35">{result.detail}</p>
      </div>
    );
  }

  const customer = result.customer;

  const orders = customer.orders.edges.map((edge) => edge.node);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="flex items-start justify-between gap-6 border-b border-ink/10 pb-8">
        <Reveal>
          <p className="font-numeral text-[0.66rem] uppercase tracking-[0.28em] text-ink/45">
            Account
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.005em]">
            {customer.firstName ? `Hi, ${customer.firstName}` : "Your account"}
          </h1>
          {customer.emailAddress && (
            <p className="mt-2 text-ink/60">{customer.emailAddress.emailAddress}</p>
          )}
        </Reveal>

        <a
          href="/account/logout"
          className="shrink-0 font-numeral text-[0.68rem] uppercase tracking-[0.2em] text-ink/45 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink"
        >
          Sign out
        </a>
      </div>

      <Reveal delay={100} className="mt-12">
        <h2 className="text-xl font-bold tracking-[-0.008em]">Order history</h2>

        {orders.length === 0 ? (
          <p className="mt-4 text-ink/50">No orders yet.</p>
        ) : (
          <ul className="mt-6 divide-y divide-ink/10">
            {orders.map((order) => (
              <li key={order.id} className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium">{order.name}</p>
                  <p className="mt-0.5 text-sm text-ink/50">
                    {new Date(order.processedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    {order.fulfillmentStatus ? ` · ${order.fulfillmentStatus.toLowerCase()}` : ""}
                  </p>
                </div>
                <p className="font-numeral tabular-nums">{formatMoney(order.totalPrice)}</p>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </div>
  );
}

function SignedOut({ notConfigured }: { notConfigured: boolean }) {
  return (
    <div className="mx-auto max-w-md px-5 py-24 text-center sm:px-8">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-[-0.005em]">Sign in</h1>
        <p className="mt-4 text-ink/60">View your orders and manage your account.</p>

        {notConfigured ? (
          <p className="mt-9 rounded-2xl bg-mix/10 px-5 py-4 text-sm text-mix">
            Customer accounts aren&rsquo;t set up yet — this needs the site deployed
            and a Customer Account API client configured in Shopify admin.
          </p>
        ) : (
          <Link
            href="/account/login"
            className="mt-9 inline-block rounded-full bg-ink px-8 py-4 font-numeral text-[0.7rem] uppercase tracking-[0.2em] text-paper transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-[1.04]"
          >
            Sign in
          </Link>
        )}
      </Reveal>
    </div>
  );
}
