import { resolveImage } from './imageMap';
import type { City, Dish, Tour, Partner } from '@/types/content';

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function loadCities(): Promise<City[]> {
  const raw = await fetchJSON<(Omit<City, 'heroImage' | 'gallery'> & { heroImage: string; gallery: string[] })[]>('/data/cities.json');
  return raw.map((c) => ({
    ...c,
    heroImage: resolveImage(c.heroImage),
    gallery: c.gallery.map(resolveImage),
  }));
}

export async function loadDishes(): Promise<Dish[]> {
  const raw = await fetchJSON<(Omit<Dish, 'image'> & { image: string })[]>('/data/dishes.json');
  return raw.map((d) => ({
    ...d,
    image: resolveImage(d.image),
  }));
}

type RawTourStep = { time: string; title: Tour['itinerary'][0]['title']; description: Tour['itinerary'][0]['description']; image?: string };
type RawTour = Omit<Tour, 'image' | 'itinerary'> & { image: string; itinerary: RawTourStep[] };

export async function loadTours(): Promise<Tour[]> {
  const raw = await fetchJSON<RawTour[]>('/data/tours.json');
  return raw.map((t) => ({
    ...t,
    image: resolveImage(t.image),
    itinerary: (t.itinerary ?? []).map((step: RawTourStep) => ({
      ...step,
      image: step.image ? resolveImage(step.image) : undefined,
    })),
  }));
}

export async function loadPartners(): Promise<Partner[]> {
  return fetchJSON<Partner[]>('/data/partners.json');
}
