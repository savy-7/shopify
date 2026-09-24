import { AUTH_CONFIG } from "@/lib/auth/config";
import type { Money } from "./types";

/**
 * The Customer Account API is a separate GraphQL endpoint and schema from
 * the Storefront API used everywhere else in this app — different auth
 * (OAuth access token, not the Storefront token), different host, different
 * field names. This file is deliberately self-contained rather than reusing
 * `shopifyFetch`.
 *
 * Field names below (financialStatus, fulfillmentStatus, totalPrice…) follow
 * the Customer Account API's Order type as documented, but this integration
 * has not yet been exercised against a live store — that needs a deployed
 * HTTPS callback URL and the client set up in Shopify admin, neither of
 * which exist yet. A schema mismatch here fails a single GraphQL request,
 * not the app: getCustomerAccount returns null and the account page shows a
 * retry message rather than crashing. Treat the first real login as the
 * verification step, and check the actual field names against Shopify's
 * GraphiQL explorer if the orders list comes back empty unexpectedly.
 */

const CUSTOMER_QUERY = `#graphql
  query CustomerAccount {
    customer {
      firstName
      lastName
      emailAddress {
        emailAddress
      }
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            name
            processedAt
            financialStatus
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type CustomerOrder = {
  id: string;
  name: string;
  processedAt: string;
  financialStatus: string | null;
  fulfillmentStatus: string | null;
  totalPrice: Money;
  lineItems: { edges: { node: { title: string; quantity: number } }[] };
};

export type CustomerAccount = {
  firstName: string | null;
  lastName: string | null;
  emailAddress: { emailAddress: string } | null;
  orders: { edges: { node: CustomerOrder }[] };
};

export async function getCustomerAccount(accessToken: string): Promise<CustomerAccount | null> {
  try {
    const res = await fetch(AUTH_CONFIG.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // The Customer Account API takes the raw access token — no "Bearer " prefix.
        Authorization: accessToken,
      },
      body: JSON.stringify({ query: CUSTOMER_QUERY }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`[customer-account] HTTP ${res.status}:`, await res.text().catch(() => ""));
      return null;
    }

    const body = await res.json();
    if (body.errors) {
      console.error("[customer-account] GraphQL errors:", JSON.stringify(body.errors));
      return null;
    }

    return body.data?.customer ?? null;
  } catch (error) {
    console.error("[customer-account] request failed:", error);
    return null;
  }
}
