import { NextResponse } from "next/server";
import { clearSession, readSession, refreshTokens, writeSession } from "@/lib/auth/session";

/**
 * The one piece of write access a Server Component can't do for itself:
 * renewing an expired access token means setting cookies, which Next.js
 * doesn't allow mid-render. The account page redirects here instead, and
 * this sends the visitor straight back to `next` once the token is renewed.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = url.searchParams.get("next") ?? "/account";
  const session = await readSession();

  if (session.status === "authenticated") {
    return NextResponse.redirect(new URL(next, url));
  }
  if (session.status === "signed-out") {
    return NextResponse.redirect(new URL("/account/login", url));
  }

  try {
    const tokens = await refreshTokens(session.refreshToken);
    await writeSession(tokens);
  } catch (error) {
    console.error("[auth] refresh failed:", error);
    await clearSession();
    return NextResponse.redirect(new URL("/account/login", url));
  }

  return NextResponse.redirect(new URL(next, url));
}
