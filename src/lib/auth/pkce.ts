import { randomBytes, createHash } from "node:crypto";

function base64url(input: Buffer): string {
  return input.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** RFC 7636 code verifier: 43 chars from the unreserved character set. */
export function generateCodeVerifier(): string {
  return base64url(randomBytes(32));
}

export function generateCodeChallenge(verifier: string): string {
  return base64url(createHash("sha256").update(verifier).digest());
}

/** Used for both the OAuth `state` and the OIDC `nonce` parameters. */
export function generateRandomToken(): string {
  return base64url(randomBytes(24));
}
