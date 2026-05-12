import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  HOME_ONBOARDING_KEY,
  readOnboardingCompleted,
  writeOnboardingCompleted,
} from "@/lib/onboardingStorage";

describe("onboardingStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("returns false when key is missing", () => {
    expect(readOnboardingCompleted(HOME_ONBOARDING_KEY)).toBe(false);
  });

  it("writes and reads completed state", () => {
    writeOnboardingCompleted(HOME_ONBOARDING_KEY, true);
    expect(readOnboardingCompleted(HOME_ONBOARDING_KEY)).toBe(true);
  });

  it("returns false if localStorage getItem throws", () => {
    const key = `${HOME_ONBOARDING_KEY}.throws`;
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(readOnboardingCompleted(key)).toBe(false);
  });

  it("does not throw if localStorage setItem throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => writeOnboardingCompleted(HOME_ONBOARDING_KEY, true)).not.toThrow();
  });

  it("writes and reads via in-memory fallback when localStorage is unavailable", () => {
    const key = `${HOME_ONBOARDING_KEY}.fallback`;
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });

    writeOnboardingCompleted(key, true);
    expect(readOnboardingCompleted(key)).toBe(true);
  });
});
