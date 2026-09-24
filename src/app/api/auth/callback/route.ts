import { NextResponse } from "next/server";
import { AUTH_CONFIG } from "@/lib/auth/config";
import { exchangeCodeForTokens, readAndClearPendingOAuth, writeSession } from "@/lib/auth/session";

/**
 * This exact URL — {NEXT_PUBLIC_SITE_URL}/api/auth/callback — must be
 * registered as a Callback URL in the Customer Account API settings in
 * Shopify admin, or Shopify refuses the redirect before this ever runs.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");

  const pending = await readAndClearPendingOAuth();
  const siteUrl = AUTH_CONFIG.siteUrl;

  if (oauthError) {
    return NextResponse.redirect(`${siteUrl}/account/login?error=${encodeURIComponent(oauthError)}`);
  }
  // The state check is what stops a forged callback from logging a visitor
  // into an attacker-chosen session (CSRF on the OAuth flow).
  if (!code || !state || !pending || state !== pending.state) {
    return NextResponse.redirect(`${siteUrl}/account/login?error=invalid_state`);
  }

  try {
    const tokens = await exchangeCodeForTokens(code, pending.codeVerifier);
    await writeSession(tokens);
  } catch (error) {
    console.error("[auth] token exchange failed:", error);
    return NextResponse.redirect(`${siteUrl}/account/login?error=token_exchange_failed`);
  }

  return NextResponse.redirect(`${siteUrl}${pending.next}`);
}
