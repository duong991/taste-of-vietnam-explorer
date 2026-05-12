import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomeTour from "@/components/onboarding/HomeTour";
import { HOME_ONBOARDING_KEY } from "@/lib/onboardingStorage";

vi.mock("react-joyride", () => ({
  default: (props: any) => (
    <>
      <div
        data-testid="joyride"
        data-run={String(props.run)}
        data-steps={String(props.steps?.length ?? 0)}
      />
      <button type="button" onClick={() => props.callback({ status: "finished" })}>
        finish tour
      </button>
      <button type="button" onClick={() => props.callback({ status: "skipped" })}>
        skip tour
      </button>
      <button type="button" onClick={() => props.callback({})}>
        invalid callback
      </button>
    </>
  ),
  STATUS: { FINISHED: "finished", SKIPPED: "skipped" },
}));

describe("HomeTour", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("auto-runs on first visit", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeTour />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "true");
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-steps", "5");
    });
  });

  it("does not auto-run when completed", async () => {
    window.localStorage.setItem(HOME_ONBOARDING_KEY, "1");
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeTour />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "false");
    });
  });

  it("starts tour manually when clicking replay button", async () => {
    window.localStorage.setItem(HOME_ONBOARDING_KEY, "1");
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeTour />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /xem huong dan/i }));

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "true");
    });
  });

  it("persists completion when joyride finishes", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeTour />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /finish tour/i }));

    await waitFor(() => {
      expect(window.localStorage.getItem(HOME_ONBOARDING_KEY)).toBe("1");
    });
  });

  it("persists completion when joyride is skipped", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeTour />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /skip tour/i }));

    await waitFor(() => {
      expect(window.localStorage.getItem(HOME_ONBOARDING_KEY)).toBe("1");
    });
  });

  it("stops running when route changes away from home", async () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <HomeTour /> },
        { path: "/tour", element: <HomeTour /> },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "true");
    });

    await router.navigate("/tour");

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "false");
    });
  });

  it("stops running when callback status is missing", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeTour />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "true");
    });

    fireEvent.click(screen.getByRole("button", { name: /invalid callback/i }));

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "false");
    });
  });
});
