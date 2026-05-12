export const HOME_ONBOARDING_KEY = "onboarding.home.v1.completed";

const fallbackStorage = new Map<string, string>();

export function readOnboardingCompleted(key: string): boolean {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return fallbackStorage.get(key) === "1";
  }
}

export function writeOnboardingCompleted(key: string, completed: boolean): void {
  const value = completed ? "1" : "0";

  try {
    window.localStorage.setItem(key, value);
    fallbackStorage.set(key, value);
  } catch {
    fallbackStorage.set(key, value);
  }
}
