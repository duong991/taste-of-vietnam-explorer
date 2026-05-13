import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, MemoryRouter, RouterProvider } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomeTour from "@/components/onboarding/HomeTour";
import { HOME_ONBOARDING_KEY } from "@/lib/onboardingStorage";

vi.mock("@/hooks/useLocale", () => ({
  useLocale: () => ({
    t: (key: string) =>
      (
        {
          "onboarding.home.replay": "Xem hướng dẫn",
          "onboarding.home.badge": "Lối tắt khám phá",
          "onboarding.home.replay_hint": "Đi một vòng thật nhanh qua homepage.",
          "onboarding.home.step_hero": "hero",
          "onboarding.home.step_search": "search",
          "onboarding.home.step_tours": "tours",
          "onboarding.home.step_dishes": "dishes",
          "onboarding.home.step_cta": "cta",
          "onboarding.home.back": "Quay lại",
          "onboarding.home.close": "Đóng",
          "onboarding.home.done": "Hoàn tất",
          "onboarding.home.next": "Tiếp theo",
          "onboarding.home.open": "Mở tour",
          "onboarding.home.skip": "Bỏ qua",
        } as Record<string, string>
      )[key] ?? key,
  }),
}));

vi.mock("react-joyride", () => ({
  Joyride: (props: {
    run?: boolean;
    steps?: unknown[];
    callback: (data: { status?: string; action?: string; type?: string }) => void;
  }) => (
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
      <button type="button" onClick={() => props.callback({ status: "mystery_status" })}>
        unknown status callback
      </button>
      <button type="button" onClick={() => props.callback({ action: "close" })}>
        close tour
      </button>
      <button type="button" onClick={() => props.callback({ type: "error:target_not_found" })}>
        missing target callback
      </button>
      <button
        type="button"
        onClick={() => props.callback({ status: "skipped", type: "error:target_not_found" })}
      >
        skipped missing target callback
      </button>
    </>
  ),
  ACTIONS: { CLOSE: "close" },
  EVENTS: { TARGET_NOT_FOUND: "error:target_not_found" },
  STATUS: { FINISHED: "finished", SKIPPED: "skipped" },
}));

describe("HomeTour", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.body.innerHTML = `
      <div data-tour="home-hero"></div>
      <div data-tour="home-search"></div>
      <div data-tour="home-featured-tours"></div>
      <div data-tour="home-featured-dishes"></div>
      <div data-tour="home-cta"></div>
    `;
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

  it("marks onboarding as seen as soon as auto-tour starts", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeTour />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "true");
      expect(window.localStorage.getItem(HOME_ONBOARDING_KEY)).toBe("1");
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

    fireEvent.click(screen.getByRole("button", { name: /xem hướng dẫn/i }));

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

    await act(async () => {
      await router.navigate("/tour");
    });

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "false");
    });
  });

  it("keeps running when callback status is missing", async () => {
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
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "true");
    });
  });

  it("keeps running when callback status is unknown", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeTour />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "true");
    });

    fireEvent.click(screen.getByRole("button", { name: /unknown status callback/i }));

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "true");
    });
  });

  it("persists completion when joyride is closed", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeTour />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /close tour/i }));

    await waitFor(() => {
      expect(window.localStorage.getItem(HOME_ONBOARDING_KEY)).toBe("1");
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "false");
    });
  });

  it("keeps running when a target is missing", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeTour />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "true");
    });

    fireEvent.click(screen.getByRole("button", { name: /^missing target callback$/i }));

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "true");
    });
  });

  it("keeps the seen flag when skipped is caused by missing target", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeTour />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "true");
    });

    fireEvent.click(screen.getByRole("button", { name: /skipped missing target callback/i }));

    await waitFor(() => {
      expect(window.localStorage.getItem(HOME_ONBOARDING_KEY)).toBe("1");
      expect(screen.getByTestId("joyride")).toHaveAttribute("data-run", "true");
    });
  });
});
