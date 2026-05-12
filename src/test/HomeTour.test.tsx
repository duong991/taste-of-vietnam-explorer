import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomeTour from "@/components/onboarding/HomeTour";
import { HOME_ONBOARDING_KEY } from "@/lib/onboardingStorage";

vi.mock("react-joyride", () => ({
  default: (props: any) => (
    <div
      data-testid="joyride"
      data-run={String(props.run)}
      data-steps={String(props.steps?.length ?? 0)}
    />
  ),
  STATUS: { FINISHED: "finished", SKIPPED: "skipped" },
}));

describe("HomeTour", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("auto-runs on first visit", async () => {
    render(<HomeTour />);

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "true");
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-steps", "5");
    });
  });

  it("does not auto-run when completed", async () => {
    window.localStorage.setItem(HOME_ONBOARDING_KEY, "1");
    render(<HomeTour />);

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "false");
    });
  });

  it("starts tour manually when clicking replay button", async () => {
    window.localStorage.setItem(HOME_ONBOARDING_KEY, "1");
    render(<HomeTour />);

    fireEvent.click(screen.getByRole("button", { name: /xem huong dan/i }));

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "true");
    });
  });
});
