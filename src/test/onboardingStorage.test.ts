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
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(readOnboardingCompleted(HOME_ONBOARDING_KEY)).toBe(false);
  });

  it("does not throw if localStorage setItem throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => writeOnboardingCompleted(HOME_ONBOARDING_KEY, true)).not.toThrow();
  });
});
