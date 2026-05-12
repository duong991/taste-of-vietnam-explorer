import { describe, expect, it } from "vitest";
import {
  decryptToken,
  encryptToken,
  isEncryptedToken,
} from "@/lib/tokenCrypto";

describe("tokenCrypto", () => {
  it("encrypts and decrypts token with same secret", () => {
    const secret = "my-test-secret";
    const token = "hf_1234567890";

    const encrypted = encryptToken(token, secret);
    const decrypted = decryptToken(encrypted, secret);

    expect(isEncryptedToken(encrypted)).toBe(true);
    expect(decrypted).toBe(token);
  });

  it("throws when decrypting with wrong secret", () => {
    const encrypted = encryptToken("hf_abc", "secret-a");
    expect(() => decryptToken(encrypted, "secret-b")).toThrow(
      "Decrypt failed: invalid secret or token",
    );
  });

  it("returns false for plain tokens", () => {
    expect(isEncryptedToken("hf_abc")).toBe(false);
  });
});
