"use server";

import { randomBytes } from "node:crypto";
import { shopifyFetch } from "@/lib/shopify/client";

const CUSTOMER_CREATE = `#graphql
  mutation WaitlistSignup($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id }
      customerUserErrors { code field message }
    }
  }
`;

type CustomerCreateResult = {
  customerCreate: {
    customer: { id: string } | null;
    customerUserErrors: { code: string | null; field: string[] | null; message: string }[];
  };
};

export type WaitlistState = { status: "idle" | "ok" | "error"; message: string };

/**
 * Hamper waitlist.
 *
 * Signups land in Shopify's own customer list (admin → Customers), with
 * marketing consent recorded, so they can be exported or mailed from there
 * with no extra service to run. `customerCreate` requires a password even
 * though nobody will ever use one: this store signs people in through the
 * Customer Account API (one-time codes and Google), which authenticates by
 * email identity rather than against this value. It is therefore random and
 * discarded — never shown, never emailed.
 *
 * Verified against the live store that this mutation is authorised on the
 * current Storefront token before building on it.
 */
export async function joinHamperWaitlist(
  _previous: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  // Bots fill every field they find; a real person never sees this one.
  if (formData.get("company")) return { status: "ok", message: "Thank you — we'll be in touch." };

  const email = String(formData.get("email") ?? "").trim();

  // Deliberately loose: the real check is Shopify's, and an over-strict
  // pattern here would reject valid addresses.
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    const data = await shopifyFetch<CustomerCreateResult>({
      query: CUSTOMER_CREATE,
      variables: {
        input: {
          email,
          password: randomBytes(24).toString("base64url"),
          acceptsMarketing: true,
        },
      },
      revalidate: 0,
    });

    const errors = data.customerCreate.customerUserErrors;
    if (errors.length > 0) {
      // Already a customer — from an order, or a second attempt. That is the
      // outcome they wanted, so it isn't worth surfacing as a failure.
      if (errors.some((e) => e.code === "TAKEN" || /taken/i.test(e.message))) {
        return { status: "ok", message: "You're on the list — we'll email you when they launch." };
      }
      console.error("[waitlist] customerCreate:", JSON.stringify(errors));
      return { status: "error", message: errors[0].message };
    }

    return { status: "ok", message: "You're on the list — we'll email you when they launch." };
  } catch (error) {
    console.error("[waitlist] request failed:", error);
    return {
      status: "error",
      message: "Something went wrong. Please email hello@goodnesscrafted.com instead.",
    };
  }
}
