/**
 * Customer Account API (OAuth 2.0 + PKCE) configuration.
 *
 * The client id and the three endpoint URLs are meant to be copied verbatim
 * from Shopify admin — Settings → Customer accounts, then Sales channels →
 * Headless → (your storefront) → Customer Account API settings — rather than
 * constructed here. Shopify's own setup guide says to "record" them from
 * that screen, which suggests the URL shape isn't meant to be guessed at.
 *
 * Getters rather than top-level constants: these throw only when actually
 * read, so `pnpm build` still succeeds before the variables are configured —
 * nothing outside `/account/*` and the auth routes touches this module.
 */
function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing ${name}. See .env.local.example for the customer-account variables and how to find them in Shopify admin.`
    );
  }
  return value;
}

export const AUTH_CONFIG = {
  get clientId() {
    return required("SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID");
  },
  /** Only for a "confidential" client; unset for a "public" one. */
  get clientSecret(): string | undefined {
    return process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_SECRET || undefined;
  },
  get authorizeUrl() {
    return required("SHOPIFY_CUSTOMER_ACCOUNT_AUTHORIZE_URL");
  },
  get tokenUrl() {
    return required("SHOPIFY_CUSTOMER_ACCOUNT_TOKEN_URL");
  },
  get logoutUrl() {
    return required("SHOPIFY_CUSTOMER_ACCOUNT_LOGOUT_URL");
  },
  get apiUrl() {
    return required("SHOPIFY_CUSTOMER_ACCOUNT_API_URL");
  },
  get siteUrl() {
    // No trailing slash, so it can be concatenated directly with a path.
    return required("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "");
  },
  get redirectUri() {
    return `${this.siteUrl}/api/auth/callback`;
  },
  /** `openid email` identifies the customer; `customer-account-api:full` is
   *  what actually authorizes reading their profile and order history. */
  scope: "openid email customer-account-api:full",
};
