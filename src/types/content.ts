export type Region = 'bac' | 'trung' | 'nam';
export type Locale = 'vi' | 'en';

export interface LocalizedText {
  vi: string;
  en: string;
}

export interface City {
  slug: string;
  name: LocalizedText;
  region: Region;
  shortDescription: LocalizedText;
  story: LocalizedText;
  heroImage: string;
  gallery: string[];
  featuredDishSlugs: string[];
  featuredTourSlugs: string[];
  geo?: { lat: number; lng: number };
}

export interface Dish {
  slug: string;
  name: LocalizedText;
  citySlug: string;
  region: Region;
  type: ('savory' | 'vegetarian' | 'street' | 'fine-dining')[];
  taste: ('spicy' | 'sweet' | 'sour' | 'salty' | 'umami')[];
  story: LocalizedText;
  ingredients: LocalizedText;
  image: string;
}

export interface TourItineraryStep {
  time: string;
  title: LocalizedText;
  description: LocalizedText;
  image?: string;
}

export interface Tour {
  slug: string;
  name: LocalizedText;
  citySlug: string;
  partnerId: string;
  durationHours: number;
  priceVnd: number;
  themes: string[];
  itinerary: TourItineraryStep[];
  highlightDishSlugs: string[];
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  description: LocalizedText;
  email?: string;
  phone?: string;
  website?: string;
  zaloUrl?: string;
  messengerUrl?: string;
}

export function pickLocale(text: LocalizedText, locale: Locale = 'vi'): string {
  return text[locale] ?? text.vi;
}
