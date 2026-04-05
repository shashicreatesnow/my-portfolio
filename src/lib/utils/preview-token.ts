import { createHmac, timingSafeEqual } from "crypto";

const EXPIRY_MS = 1000 * 60 * 20;

function sign(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createPreviewToken(slug: string, secret: string) {
  const expiresAt = Date.now() + EXPIRY_MS;
  const payload = `${slug}:${expiresAt}`;
  const signature = sign(payload, secret);

  return Buffer.from(`${payload}:${signature}`).toString("base64url");
}

export function verifyPreviewToken(
  slug: string,
  token: string | null | undefined,
  secret: string,
) {
  if (!token) {
    return false;
  }

  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [tokenSlug, expiresAt, signature] = decoded.split(":");

    if (!tokenSlug || !expiresAt || !signature || tokenSlug !== slug) {
      return false;
    }

    if (Number(expiresAt) < Date.now()) {
      return false;
    }

    const expected = sign(`${tokenSlug}:${expiresAt}`, secret);

    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}
