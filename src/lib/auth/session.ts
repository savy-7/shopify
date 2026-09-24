import { cookies } from "next/headers";
import { AUTH_CONFIG } from "./config";

const ACCESS_TOKEN_COOKIE = "gc_at";
const REFRESH_TOKEN_COOKIE = "gc_rt";
const ID_TOKEN_COOKIE = "gc_it";
const EXPIRES_AT_COOKIE = "gc_exp";
const PENDING_OAUTH_COOKIE = "gc_oauth_pending";

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

/** Refresh tokens outlive access tokens; this is a conservative upper bound
 *  on the cookie itself — Shopify may invalidate the token sooner, in which
 *  case a refresh attempt fails and the visitor is sent back through
 *  /account/login, same as any other expired session. */
const REFRESH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  expires_in: number;
  token_type: string;
};

async function tokenRequest(body: Record<string, string>): Promise<TokenResponse> {
  const res = await fetch(AUTH_CONFIG.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Shopify token endpoint returned ${res.status}: ${text.slice(0, 300)}`);
  }

  return res.json();
}

export function exchangeCodeForTokens(code: string, codeVerifier: string) {
  return tokenRequest({
    grant_type: "authorization_code",
    client_id: AUTH_CONFIG.clientId,
    redirect_uri: AUTH_CONFIG.redirectUri,
    code,
    code_verifier: codeVerifier,
  });
}

export function refreshTokens(refreshToken: string) {
  return tokenRequest({
    grant_type: "refresh_token",
    client_id: AUTH_CONFIG.clientId,
    refresh_token: refreshToken,
  });
}

/** Persists a token response as the visitor's session. Only callable from a
 *  Route Handler — Server Components can't set cookies mid-render. */
export async function writeSession(tokens: TokenResponse) {
  const store = await cookies();
  const expiresAt = Date.now() + tokens.expires_in * 1000;

  store.set(ACCESS_TOKEN_COOKIE, tokens.access_token, { ...COOKIE_OPTS, maxAge: tokens.expires_in });
  store.set(EXPIRES_AT_COOKIE, String(expiresAt), { ...COOKIE_OPTS, maxAge: tokens.expires_in });

  if (tokens.refresh_token) {
    store.set(REFRESH_TOKEN_COOKIE, tokens.refresh_token, {
      ...COOKIE_OPTS,
      maxAge: REFRESH_COOKIE_MAX_AGE,
    });
  }
  if (tokens.id_token) {
    store.set(ID_TOKEN_COOKIE, tokens.id_token, { ...COOKIE_OPTS, maxAge: REFRESH_COOKIE_MAX_AGE });
  }
}

export async function clearSession() {
  const store = await cookies();
  for (const name of [ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, ID_TOKEN_COOKIE, EXPIRES_AT_COOKIE]) {
    store.delete(name);
  }
}

export type Session =
  | { status: "authenticated"; accessToken: string }
  | { status: "expired"; refreshToken: string }
  | { status: "signed-out" };

/** Read-only — safe to call from a Server Component. An expired access token
 *  with a refresh token on hand is reported as "expired" rather than
 *  "signed-out": the caller (the account page) redirects to /api/auth/refresh
 *  rather than straight to /account/login, so a returning visitor doesn't
 *  have to re-authenticate with Shopify every time their access token lapses. */
export async function readSession(): Promise<Session> {
  const store = await cookies();
  const accessToken = store.get(ACCESS_TOKEN_COOKIE)?.value;
  const expiresAt = Number(store.get(EXPIRES_AT_COOKIE)?.value ?? 0);
  const refreshToken = store.get(REFRESH_TOKEN_COOKIE)?.value;

  if (accessToken && Date.now() < expiresAt) {
    return { status: "authenticated", accessToken };
  }
  if (refreshToken) {
    return { status: "expired", refreshToken };
  }
  return { status: "signed-out" };
}

export async function readIdToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(ID_TOKEN_COOKIE)?.value;
}

// --- Pending-authorization cookie: bridges /account/login -> the callback ---

type PendingOAuth = { state: string; codeVerifier: string; nonce: string; next: string };

export async function writePendingOAuth(pending: PendingOAuth) {
  const store = await cookies();
  store.set(PENDING_OAUTH_COOKIE, JSON.stringify(pending), { ...COOKIE_OPTS, maxAge: 600 });
}

/** Read once, then discarded — a login attempt is single-use win or lose. */
export async function readAndClearPendingOAuth(): Promise<PendingOAuth | null> {
  const store = await cookies();
  const raw = store.get(PENDING_OAUTH_COOKIE)?.value;
  store.delete(PENDING_OAUTH_COOKIE);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as PendingOAuth;
  } catch {
    return null;
  }
}
