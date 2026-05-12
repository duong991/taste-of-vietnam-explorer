import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Index from "@/pages/Index";
import type { ReactNode } from "react";

vi.mock("@/hooks/useCities", () => ({
  useCities: () => ({ data: [], isLoading: false, isError: false }),
}));

vi.mock("@/hooks/useDishes", () => ({
  useDishes: () => ({ data: [], isLoading: false, isError: false }),
}));

vi.mock("@/hooks/useTours", () => ({
  useTours: () => ({ data: [], isLoading: false, isError: false }),
}));

vi.mock("@/hooks/useLocale", () => ({
  useLocale: () => ({
    t: (key: string) => key,
    pick: () => "",
    path: { tourList: "/tour" },
  }),
}));

vi.mock("@/components/onboarding/HomeTour", () => ({
  default: () => <div data-testid="home-tour" />,
}));

vi.mock("@/components/Header", () => ({ default: () => <div /> }));
vi.mock("@/components/Hero", () => ({ default: () => <div /> }));
vi.mock("@/components/SectionHeader", () => ({ default: () => <div /> }));
vi.mock("@/components/Carousel", () => ({ default: ({ children }: { children: ReactNode }) => <div>{children}</div> }));
vi.mock("@/components/CityCard", () => ({ default: () => <div /> }));
vi.mock("@/components/FoodCard", () => ({ default: () => <div /> }));
vi.mock("@/components/TourCard", () => ({ default: () => <div /> }));
vi.mock("@/components/Features", () => ({ default: () => <div /> }));
vi.mock("@/components/CTABanner", () => ({ default: () => <div /> }));
vi.mock("@/components/Footer", () => ({ default: () => <div /> }));
vi.mock("@/components/Chatbot", () => ({ default: () => <div /> }));

describe("Index home tour integration", () => {
  it("renders all tour target markers and mounts HomeTour", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    expect(document.querySelector('[data-tour="home-hero"]')).toBeTruthy();
    expect(document.querySelector('[data-tour="home-search"]')).toBeTruthy();
    expect(document.querySelector('[data-tour="home-featured-tours"]')).toBeTruthy();
    expect(document.querySelector('[data-tour="home-featured-dishes"]')).toBeTruthy();
    expect(document.querySelector('[data-tour="home-cta"]')).toBeTruthy();
    expect(screen.getByTestId("home-tour")).toBeInTheDocument();
  });
});
