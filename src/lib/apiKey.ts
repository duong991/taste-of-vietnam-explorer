import { decryptToken, encryptToken, isEncryptedToken } from "@/lib/tokenCrypto";

const STORAGE_KEY = "tinh_user_api_key";
const DEFAULT_ENCRYPTED_KEY = "enc::U2FsdGVkX198/HpO6Cx+NqrjB4WuCj0oVrG7pJCDfsWQQRFHCboXxXze4XOcKE8pWIY2oBgaVV9GCe7lnsDICA==";
const DEFAULT_SECRET = "taste-of-vietnam";

function resolveSecret(): string {
  const fromEnv = import.meta.env.VITE_API_KEY_SECRET as string | undefined;
  return (fromEnv ?? DEFAULT_SECRET).trim();
}

export function parseApiKeyValue(value: string | null, secret: string): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (!isEncryptedToken(trimmed)) return trimmed;
  if (!secret.trim()) return null;

  try {
    return decryptToken(trimmed, secret);
  } catch {
    return null;
  }
}

export function toStoredApiKeyValue(plainKey: string, secret: string): string | null {
  const trimmed = plainKey.trim();
  if (!trimmed) return null;
  if (!secret.trim()) return trimmed;

  return encryptToken(trimmed, secret);
}

export function resolveApiKey(params: {
  userStoredKey: string | null;
  defaultEncryptedKey: string;
  secret: string;
}): string | null {
  const { userStoredKey, defaultEncryptedKey, secret } = params;
  const userKey = parseApiKeyValue(userStoredKey, secret);
  if (userKey) return userKey;

  return parseApiKeyValue(defaultEncryptedKey, secret);
}

export function getUserApiKey(): string | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return parseApiKeyValue(stored, resolveSecret());
  } catch {
    return null;
  }
}

export function setUserApiKey(key: string): void {
  try {
    const storedValue = toStoredApiKeyValue(key, resolveSecret());
    if (storedValue) {
      localStorage.setItem(STORAGE_KEY, storedValue);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    /* ignore */
  }
}

export function clearUserApiKey(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function hasUserApiKey(): boolean {
  const key = getUserApiKey();
  return !!key && key.length > 0;
}

export function getResolvedApiKey(): string | null {
  try {
    const secret = resolveSecret();
    const userStoredKey = localStorage.getItem(STORAGE_KEY);
    return resolveApiKey({
      userStoredKey,
      defaultEncryptedKey: DEFAULT_ENCRYPTED_KEY,
      secret,
    });
  } catch {
    return null;
  }
}
