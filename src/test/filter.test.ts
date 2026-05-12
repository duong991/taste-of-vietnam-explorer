import { describe, it, expect } from "vitest";
import {
  filterDishes,
  filterTours,
  filterCities,
  sortDishes,
  sortTours,
} from "@/lib/filter";
import type { Dish, Tour, City } from "@/types/content";

const makeDish = (overrides: Partial<Dish> = {}): Dish => ({
  slug: "pho-ha-noi",
  name: { vi: "Phở Hà Nội", en: "Hanoi Pho" },
  citySlug: "ha-noi",
  region: "bac",
  type: ["savory"],
  taste: ["umami"],
  story: { vi: "Câu chuyện…", en: "Story…" },
  ingredients: { vi: "Nguyên liệu…", en: "Ingredients…" },
  image: "/img/pho.jpg",
  ...overrides,
});

const makeTour = (overrides: Partial<Tour> = {}): Tour => ({
  slug: "ha-noi-street-food-tour",
  name: { vi: "Tour Đường Phố HN", en: "Hanoi Street Food Tour" },
  citySlug: "ha-noi",
  partnerId: "partner-a",
  durationHours: 3,
  priceVnd: 500_000,
  themes: ["street-food"],
  itinerary: [],
  highlightDishSlugs: ["pho-ha-noi"],
  image: "/img/tour.jpg",
  ...overrides,
});

const makeCity = (overrides: Partial<City> = {}): City => ({
  slug: "ha-noi",
  name: { vi: "Hà Nội", en: "Hanoi" },
  region: "bac",
  shortDescription: { vi: "Ngắn…", en: "Short…" },
  story: { vi: "Dài…", en: "Long…" },
  heroImage: "/img/hn.jpg",
  gallery: [],
  geo: { lat: 21.02, lng: 105.85 },
  featuredDishSlugs: [],
  featuredTourSlugs: [],
  ...overrides,
});

/* ─── filterDishes ──────────────────────────────────────────────── */
describe("filterDishes", () => {
  const dishes = [
    makeDish({ slug: "pho", name: { vi: "Phở Hà Nội", en: "Hanoi Pho" }, region: "bac", citySlug: "ha-noi", type: ["savory"], taste: ["umami"] }),
    makeDish({ slug: "mi-quang", name: { vi: "Mì Quảng", en: "Mi Quang" }, region: "trung", citySlug: "da-nang", type: ["savory"], taste: ["spicy"] }),
    makeDish({ slug: "banh-xeo", name: { vi: "Bánh Xèo", en: "Sizzling Crepe" }, region: "nam", citySlug: "ho-chi-minh", type: ["street"], taste: ["sour"] }),
  ];

  it("returns all when query is empty", () => {
    expect(filterDishes(dishes, {})).toHaveLength(3);
  });

  it("filters by region", () => {
    const result = filterDishes(dishes, { region: "bac" });
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("pho");
  });

  it("filters by citySlug", () => {
    const result = filterDishes(dishes, { citySlug: "da-nang" });
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("mi-quang");
  });

  it("filters by type (matches any)", () => {
    const result = filterDishes(dishes, { types: ["street"] });
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("banh-xeo");
  });

  it("filters by taste (matches any)", () => {
    const result = filterDishes(dishes, { tastes: ["spicy", "umami"] });
    expect(result).toHaveLength(2);
  });

  it("filters by text query (vi name)", () => {
    const result = filterDishes(dishes, { q: "Phở" });
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("pho");
  });

  it("filters by text query (en name)", () => {
    const result = filterDishes(dishes, { q: "Hanoi" });
    expect(result).toHaveLength(1);
  });

  it("returns empty when nothing matches", () => {
    expect(filterDishes(dishes, { region: "bac", citySlug: "da-nang" })).toHaveLength(0);
  });
});

/* ─── filterTours ───────────────────────────────────────────────── */
describe("filterTours", () => {
  const tours = [
    makeTour({ slug: "t1", citySlug: "ha-noi", priceVnd: 300_000, durationHours: 2, themes: ["street-food"] }),
    makeTour({ slug: "t2", citySlug: "ha-noi", priceVnd: 800_000, durationHours: 5, themes: ["fine-dining"] }),
    makeTour({ slug: "t3", citySlug: "da-nang", priceVnd: 500_000, durationHours: 3, themes: ["cooking-class"] }),
  ];

  it("returns all when query is empty", () => {
    expect(filterTours(tours, {})).toHaveLength(3);
  });

  it("filters by citySlug", () => {
    expect(filterTours(tours, { citySlug: "ha-noi" })).toHaveLength(2);
  });

  it("filters by durationMax", () => {
    const result = filterTours(tours, { durationMax: 3 });
    expect(result).toHaveLength(2);
  });

  it("filters by theme (matches any)", () => {
    const result = filterTours(tours, { themes: ["street-food", "cooking-class"] });
    expect(result).toHaveLength(2);
  });

  it("filters by text query (vi name)", () => {
    const result = filterTours(tours, { q: "Đường Phố" });
    expect(result).toHaveLength(3);
  });
});

/* ─── filterCities ──────────────────────────────────────────────── */
describe("filterCities", () => {
  const cities = [
    makeCity({ slug: "ha-noi", region: "bac" }),
    makeCity({ slug: "hue", region: "trung" }),
    makeCity({ slug: "ho-chi-minh", region: "nam" }),
  ];

  it("returns all when no region", () => {
    expect(filterCities(cities)).toHaveLength(3);
  });

  it("filters by region", () => {
    expect(filterCities(cities, "nam")).toHaveLength(1);
    expect(filterCities(cities, "trung")).toHaveLength(1);
  });
});

/* ─── sortDishes ────────────────────────────────────────────────── */
describe("sortDishes", () => {
  const dishes = [
    makeDish({ slug: "c", name: { vi: "Chè", en: "Che" } }),
    makeDish({ slug: "p", name: { vi: "Phở", en: "Pho" } }),
    makeDish({ slug: "b", name: { vi: "Bánh", en: "Banh" } }),
  ];

  it("default returns original order", () => {
    const result = sortDishes(dishes, "default");
    expect(result.map((d) => d.slug)).toEqual(["c", "p", "b"]);
  });

  it("name-asc sorts A→Z", () => {
    const result = sortDishes(dishes, "name-asc");
    expect(result[0].name.vi < result[1].name.vi).toBe(true);
  });

  it("name-desc sorts Z→A", () => {
    const result = sortDishes(dishes, "name-desc");
    expect(result[0].name.vi > result[1].name.vi).toBe(true);
  });

  it("does not mutate input array", () => {
    const input = [...dishes];
    sortDishes(input, "name-asc");
    expect(input.map((d) => d.slug)).toEqual(["c", "p", "b"]);
  });
});

/* ─── sortTours ─────────────────────────────────────────────────── */
describe("sortTours", () => {
  const tours = [
    makeTour({ slug: "mid", priceVnd: 500_000, durationHours: 3 }),
    makeTour({ slug: "hi", priceVnd: 900_000, durationHours: 5 }),
    makeTour({ slug: "lo", priceVnd: 200_000, durationHours: 1 }),
  ];

  it("default returns original order", () => {
    expect(sortTours(tours, "default").map((t) => t.slug)).toEqual(["mid", "hi", "lo"]);
  });

  it("duration-asc sorts shortest first", () => {
    const result = sortTours(tours, "duration-asc");
    expect(result[0].durationHours).toBe(1);
  });

  it("does not mutate input array", () => {
    const slugs = tours.map((t) => t.slug);
    sortTours(tours, "duration-asc");
    expect(tours.map((t) => t.slug)).toEqual(slugs);
  });
});
