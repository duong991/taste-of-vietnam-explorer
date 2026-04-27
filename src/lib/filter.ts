import type { City, Dish, Tour, Region } from '@/types/content';

export interface DishFilterQuery {
  region?: Region;
  citySlug?: string;
  types?: string[];
  tastes?: string[];
  q?: string;
}

export interface TourFilterQuery {
  citySlug?: string;
  priceMin?: number;
  priceMax?: number;
  durationMax?: number;
  themes?: string[];
  q?: string;
}

function matchesText(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

export function filterDishes(dishes: Dish[], query: DishFilterQuery): Dish[] {
  return dishes.filter((dish) => {
    if (query.region && dish.region !== query.region) return false;
    if (query.citySlug && dish.citySlug !== query.citySlug) return false;
    if (query.types?.length && !query.types.some((t) => dish.type.includes(t as Dish['type'][0]))) return false;
    if (query.tastes?.length && !query.tastes.some((t) => dish.taste.includes(t as Dish['taste'][0]))) return false;
    if (query.q) {
      const q = query.q;
      if (!matchesText(dish.name.vi, q) && !matchesText(dish.name.en, q)) return false;
    }
    return true;
  });
}

export function filterTours(tours: Tour[], query: TourFilterQuery): Tour[] {
  return tours.filter((tour) => {
    if (query.citySlug && tour.citySlug !== query.citySlug) return false;
    if (query.priceMin !== undefined && tour.priceVnd < query.priceMin) return false;
    if (query.priceMax !== undefined && tour.priceVnd > query.priceMax) return false;
    if (query.durationMax !== undefined && tour.durationHours > query.durationMax) return false;
    if (query.themes?.length && !query.themes.some((t) => tour.themes.includes(t))) return false;
    if (query.q) {
      const q = query.q;
      if (!matchesText(tour.name.vi, q) && !matchesText(tour.name.en, q)) return false;
    }
    return true;
  });
}

export function filterCities(cities: City[], region?: Region): City[] {
  if (!region) return cities;
  return cities.filter((c) => c.region === region);
}

export type DishSortKey = 'name-asc' | 'name-desc' | 'default';
export type TourSortKey = 'price-asc' | 'price-desc' | 'duration-asc' | 'default';

export function sortDishes(dishes: Dish[], sort: DishSortKey): Dish[] {
  const copy = [...dishes];
  if (sort === 'name-asc') return copy.sort((a, b) => a.name.vi.localeCompare(b.name.vi));
  if (sort === 'name-desc') return copy.sort((a, b) => b.name.vi.localeCompare(a.name.vi));
  return copy;
}

export function sortTours(tours: Tour[], sort: TourSortKey): Tour[] {
  const copy = [...tours];
  if (sort === 'price-asc') return copy.sort((a, b) => a.priceVnd - b.priceVnd);
  if (sort === 'price-desc') return copy.sort((a, b) => b.priceVnd - a.priceVnd);
  if (sort === 'duration-asc') return copy.sort((a, b) => a.durationHours - b.durationHours);
  return copy;
}
