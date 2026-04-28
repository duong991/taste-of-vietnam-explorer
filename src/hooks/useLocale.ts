import { useTranslation } from "react-i18next";
import type { Locale } from "@/types/content";
import { pickLocale as _pick } from "@/types/content";

const PATHS_VI = {
  cityList: "/thanh-pho",
  city: (slug: string) => `/thanh-pho/${slug}`,
  dishList: "/mon-an",
  dish: (slug: string) => `/mon-an/${slug}`,
  tourList: "/tour",
  tour: (slug: string) => `/tour/${slug}`,
  search: "/tim-kiem",
} as const;

const PATHS_EN = {
  cityList: "/cities",
  city: (slug: string) => `/cities/${slug}`,
  dishList: "/dishes",
  dish: (slug: string) => `/dishes/${slug}`,
  tourList: "/tours",
  tour: (slug: string) => `/tours/${slug}`,
  search: "/search",
} as const;

export function useLocale() {
  const { t, i18n } = useTranslation();

  const locale: Locale = i18n.language === "en" ? "en" : "vi";

  const pick = (text: { vi: string; en: string }) => _pick(text, locale);

  const path = locale === "en" ? PATHS_EN : PATHS_VI;

  return { t, locale, pick, path, i18n };
}
