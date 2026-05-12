export const HOME_ONBOARDING_KEY = "onboarding.home.v1.completed";

export function readOnboardingCompleted(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

export function writeOnboardingCompleted(key: string, completed: boolean): void {
  try {
    window.localStorage.setItem(key, completed ? "1" : "0");
  } catch {
    // intentionally no-op; onboarding must never block app usage
  }
}
