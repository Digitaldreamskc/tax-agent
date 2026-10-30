import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.AUTH_SECRET ?? "change-me-in-production";

// Allowed users — pulled from env vars so passwords never touch source control
export const ALLOWED_USERS: Record<string, string> = {
  [process.env.AUTH_USER_1_EMAIL?.toLowerCase() ?? "jessica@socialbalances.com"]:
    process.env.AUTH_USER_1_PASS ?? "Back2KC2025!",
  [process.env.AUTH_USER_2_EMAIL?.toLowerCase() ?? "mary@socialbalances.com"]:
    process.env.AUTH_USER_2_PASS ?? "Back2KC2025!",
};

export const SESSION_COOKIE = "b2kc_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function createSessionToken(email: string): string {
  const payload = `${email.toLowerCase()}:${Date.now()}`;
  const sig = sign(payload);
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function verifySessionToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const lastColon = decoded.lastIndexOf(":");
    const payload = decoded.slice(0, lastColon);
    const sig = decoded.slice(lastColon + 1);
    const expected = sign(payload);
    // timing-safe comparison
    const sigBuf = Buffer.from(sig);
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length) return null;
    if (!timingSafeEqual(sigBuf, expBuf)) return null;
    const email = payload.split(":")[0];
    return email ?? null;
  } catch {
    return null;
  }
}

export function checkCredentials(email: string, password: string): boolean {
  const stored = ALLOWED_USERS[email.toLowerCase()];
  if (!stored) return false;
  // timing-safe comparison
  try {
    const a = Buffer.from(stored.padEnd(72));
    const b = Buffer.from(password.padEnd(72));
    return timingSafeEqual(a, b) && stored === password;
  } catch {
    return false;
  }
}
