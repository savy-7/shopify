import { NextResponse } from "next/server";
import { generateCodeChallenge, generateCodeVerifier, generateRandomToken } from "@/lib/auth/pkce";
import { AUTH_CONFIG } from "@/lib/auth/config";
import { writePendingOAuth } from "@/lib/auth/session";

/**
 * Starts the OAuth 2.0 + PKCE flow against Shopify's Customer Account API.
 * `next` lets a caller send the visitor back to wherever they were (rather
 * than always landing on the account page) once they've signed in.
 */
export async function GET(request: Request) {
  const next = new URL(request.url).searchParams.get("next") ?? "/account";

  // AUTH_CONFIG's getters throw if the Customer Account API variables aren't
  // set yet — expected until that's configured in Shopify admin and
  // deployed. Fails to a friendly message instead of a raw 500.
  let authorizeUrl: URL;
  try {
    const codeVerifier = generateCodeVerifier();
    const state = generateRandomToken();
    const nonce = generateRandomToken();

    await writePendingOAuth({ state, codeVerifier, nonce, next });

    authorizeUrl = new URL(AUTH_CONFIG.authorizeUrl);
    authorizeUrl.searchParams.set("client_id", AUTH_CONFIG.clientId);
    authorizeUrl.searchParams.set("redirect_uri", AUTH_CONFIG.redirectUri);
    authorizeUrl.searchParams.set("response_type", "code");
    authorizeUrl.searchParams.set("scope", AUTH_CONFIG.scope);
    authorizeUrl.searchParams.set("state", state);
    authorizeUrl.searchParams.set("nonce", nonce);
    authorizeUrl.searchParams.set("code_challenge", generateCodeChallenge(codeVerifier));
    authorizeUrl.searchParams.set("code_challenge_method", "S256");
  } catch (error) {
    console.error("[auth] login route misconfigured:", error);
    return NextResponse.redirect(new URL("/account?error=not_configured", request.url));
  }

  return NextResponse.redirect(authorizeUrl);
}
