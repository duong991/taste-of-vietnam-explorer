import { describe, expect, it } from "vitest";
import { decryptToken, encryptToken } from "@/lib/tokenCrypto";
import {
  parseApiKeyValue,
  toStoredApiKeyValue,
  resolveApiKey,
} from "@/lib/apiKey";

describe("apiKey helpers", () => {
  it("stores user input as encrypted value when secret is provided", () => {
    const stored = toStoredApiKeyValue("hf_user_plain", "local-secret");
    expect(stored?.startsWith("enc::")).toBe(true);
    expect(decryptToken(stored!, "local-secret")).toBe("hf_user_plain");
  });

  it("parses plaintext and encrypted values", () => {
    const encrypted = encryptToken("hf_default", "local-secret");
    expect(parseApiKeyValue("hf_user_plain", "local-secret")).toBe("hf_user_plain");
    expect(parseApiKeyValue(encrypted, "local-secret")).toBe("hf_default");
  });

  it("resolves user key first, then default encrypted key", () => {
    const defaultEncrypted = encryptToken("hf_default", "local-secret");
    const resolvedFromDefault = resolveApiKey({
      userStoredKey: null,
      defaultEncryptedKey: defaultEncrypted,
      secret: "local-secret",
    });
    expect(resolvedFromDefault).toBe("hf_default");

    const resolvedFromUser = resolveApiKey({
      userStoredKey: "hf_user_plain",
      defaultEncryptedKey: defaultEncrypted,
      secret: "local-secret",
    });
    expect(resolvedFromUser).toBe("hf_user_plain");
  });
});
