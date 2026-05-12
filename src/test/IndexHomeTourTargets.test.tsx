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
vi.mock("@/components/Hero", () => ({ default: () => <section data-tour="home-hero" /> }));
vi.mock("@/components/SectionHeader", () => ({ default: () => <div /> }));
vi.mock("@/components/Carousel", () => ({ default: ({ children }: { children: ReactNode }) => <div>{children}</div> }));
vi.mock("@/components/CityCard", () => ({ default: () => <div /> }));
vi.mock("@/components/FoodCard", () => ({ default: () => <div /> }));
vi.mock("@/components/TourCard", () => ({ default: () => <div /> }));
vi.mock("@/components/Features", () => ({ default: () => <div /> }));
vi.mock("@/components/CTABanner", () => ({ default: () => <section data-tour="home-cta" /> }));
vi.mock("@/components/Footer", () => ({ default: () => <div /> }));
vi.mock("@/components/Chatbot", () => ({ default: () => <div /> }));

describe("Index home tour integration", () => {
  it("renders all tour target markers and mounts HomeTour", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    const heroTarget = document.querySelector('[data-tour="home-hero"]');
    const searchTarget = document.querySelector('[data-tour="home-search"]');
    const featuredToursTarget = document.querySelector('[data-tour="home-featured-tours"]');
    const featuredDishesTarget = document.querySelector('[data-tour="home-featured-dishes"]');
    const ctaTarget = document.querySelector('[data-tour="home-cta"]');

    expect(heroTarget).toBeInTheDocument();
    expect(document.querySelectorAll('[data-tour="home-hero"]')).toHaveLength(1);

    expect(searchTarget).toBeInTheDocument();
    expect(document.querySelectorAll('[data-tour="home-search"]')).toHaveLength(1);

    expect(featuredToursTarget).toBeInTheDocument();
    expect(document.querySelectorAll('[data-tour="home-featured-tours"]')).toHaveLength(1);

    expect(featuredDishesTarget).toBeInTheDocument();
    expect(document.querySelectorAll('[data-tour="home-featured-dishes"]')).toHaveLength(1);

    expect(ctaTarget).toBeInTheDocument();
    expect(document.querySelectorAll('[data-tour="home-cta"]')).toHaveLength(1);

    expect(screen.getByTestId("home-tour")).toBeInTheDocument();
  });
});
