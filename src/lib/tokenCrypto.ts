import CryptoJS from "crypto-js";

const PREFIX = "enc::";

export function encryptToken(plainToken: string, secret: string): string {
  const normalizedToken = plainToken.trim();
  const normalizedSecret = secret.trim();

  if (!normalizedToken) throw new Error("Token is empty");
  if (!normalizedSecret) throw new Error("Secret is empty");

  const cipher = CryptoJS.AES.encrypt(normalizedToken, normalizedSecret).toString();
  return `${PREFIX}${cipher}`;
}

export function decryptToken(encryptedToken: string, secret: string): string {
  const normalizedEncryptedToken = encryptedToken.trim();
  const normalizedSecret = secret.trim();

  if (!normalizedEncryptedToken) throw new Error("Encrypted token is empty");
  if (!normalizedSecret) throw new Error("Secret is empty");

  const raw = normalizedEncryptedToken.startsWith(PREFIX)
    ? normalizedEncryptedToken.slice(PREFIX.length)
    : normalizedEncryptedToken;

  const bytes = CryptoJS.AES.decrypt(raw, normalizedSecret);
  const plain = bytes.toString(CryptoJS.enc.Utf8);

  if (!plain) throw new Error("Decrypt failed: invalid secret or token");
  return plain;
}

export function isEncryptedToken(value: string): boolean {
  return value.trim().startsWith(PREFIX);
}
