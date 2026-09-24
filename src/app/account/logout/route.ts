import { NextResponse } from "next/server";
import { AUTH_CONFIG } from "@/lib/auth/config";
import { clearSession, readIdToken } from "@/lib/auth/session";

/**
 * Clears the local session and also ends it on Shopify's side via the
 * registered logout endpoint — otherwise a visitor who signs out here could
 * sign back in without re-entering credentials, since Shopify's own session
 * cookie would still be live.
 */
export async function GET() {
  const idTokenHint = await readIdToken();
  await clearSession();

  const logoutUrl = new URL(AUTH_CONFIG.logoutUrl);
  if (idTokenHint) logoutUrl.searchParams.set("id_token_hint", idTokenHint);
  logoutUrl.searchParams.set("post_logout_redirect_uri", AUTH_CONFIG.siteUrl);

  return NextResponse.redirect(logoutUrl);
}
