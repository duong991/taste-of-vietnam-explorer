import type { City, Dish, Tour, Locale } from '@/types/content';

export type SearchResultType = 'city' | 'dish' | 'tour';

export interface SearchResult {
  type: SearchResultType;
  slug: string;
  name: string;
  description: string;
  image: string;
  score: number;
}

function scoreMatch(text: string, query: string): number {
  const t = text.toLowerCase();
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  if (t === q) return 4;
  if (t.startsWith(q)) return 3;
  if (t.includes(q)) return 2;
  const words = q.split(/\s+/);
  if (words.length > 1 && words.every((w) => t.includes(w))) return 1;
  return 0;
}

export function searchAll(
  query: string,
  cities: City[],
  dishes: Dish[],
  tours: Tour[],
  locale: Locale = 'vi',
): SearchResult[] {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];

  for (const city of cities) {
    const name = city.name[locale];
    const desc = city.shortDescription[locale];
    const score = scoreMatch(name, query) * 3 + scoreMatch(desc, query);
    if (score > 0) {
      results.push({ type: 'city', slug: city.slug, name, description: desc, image: city.heroImage, score });
    }
  }

  for (const dish of dishes) {
    const name = dish.name[locale];
    const desc = dish.story[locale];
    const score = scoreMatch(name, query) * 3 + scoreMatch(desc, query);
    if (score > 0) {
      results.push({ type: 'dish', slug: dish.slug, name, description: desc.slice(0, 120), image: dish.image, score });
    }
  }

  for (const tour of tours) {
    const name = tour.name[locale];
    const desc = tour.itinerary[0]?.description[locale] ?? '';
    const score = scoreMatch(name, query) * 3 + scoreMatch(desc, query);
    if (score > 0) {
      results.push({ type: 'tour', slug: tour.slug, name, description: desc.slice(0, 120), image: tour.image, score });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
