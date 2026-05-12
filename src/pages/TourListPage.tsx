import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Home, ChevronRight, AlertCircle, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TourCard from "@/components/TourCard";
import FilterSidebar, { type TourFilters } from "@/components/FilterSidebar";
import SortDropdown from "@/components/SortDropdown";
import Chatbot from "@/components/Chatbot";
import { useTours } from "@/hooks/useTours";
import { useCities } from "@/hooks/useCities";
import { filterTours, sortTours, type TourSortKey } from "@/lib/filter";
import { useLocale } from "@/hooks/useLocale";

const PAGE_SIZE = 9;

const GridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="rounded-2xl bg-muted animate-pulse aspect-[4/3]" />
    ))}
  </div>
);

const EMPTY_FILTERS: TourFilters = { themes: [] };

const TourListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<TourFilters>({
    themes: searchParams.get("theme") ? [searchParams.get("theme")!] : [],
  });
  const [citySlug, setCitySlug] = useState(searchParams.get("city") ?? "");
  const [sort, setSort] = useState<TourSortKey>("default");
  const [page, setPage] = useState(1);
  const { t, pick } = useLocale();

  const SORT_OPTIONS = [
    { value: "default", label: t("tour_list.sort_default") },
    { value: "duration-asc", label: t("tour_list.sort_duration_asc") },
  ];

  const { data: tours, isLoading, isError, refetch } = useTours();
  const { data: cities } = useCities();

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.themes[0]) params.set("theme", filters.themes[0]);
    if (citySlug) params.set("city", citySlug);
    setSearchParams(params, { replace: true });
    setPage(1);
  }, [filters, citySlug, setSearchParams]);

  const filtered = filterTours(tours ?? [], {
    citySlug: citySlug || undefined,
    themes: filters.themes,
  });

  const sorted = sortTours(filtered, sort);
  const visible = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < sorted.length;

  const cityOptions = (cities ?? []).map((c) => ({ value: c.slug, label: pick(c.name) }));

  const handleReset = () => {
    setFilters(EMPTY_FILTERS);
    setCitySlug("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link to="/" className="flex items-center gap-1 hover:text-primary transition-smooth">
              <Home className="h-3.5 w-3.5" /> {t("common.home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{t("tour_list.breadcrumb")}</span>
          </nav>

          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">{t("tour_list.eyebrow")}</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
              {t("tour_list.title")}
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl">
              {t("tour_list.desc")}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-56 xl:w-64 shrink-0">
              <FilterSidebar
                mode="tour"
                filters={filters}
                onChange={setFilters}
                onReset={handleReset}
                cityOptions={cityOptions}
                citySlug={citySlug}
                onCityChange={setCitySlug}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-muted-foreground">
                  {isLoading ? t("common.loading") : `${sorted.length} ${t("tour_list.breadcrumb")}`}
                </p>
                <SortDropdown value={sort} options={SORT_OPTIONS} onChange={(v) => setSort(v as TourSortKey)} />
              </div>

              {isLoading && <GridSkeleton />}

              {isError && (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <AlertCircle className="h-10 w-10 text-destructive" />
                  <p className="text-sm text-muted-foreground">{t("tour_list.err")}</p>
                  <button
                    onClick={() => refetch()}
                    className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm hover:border-primary hover:text-primary transition-smooth"
                  >
                    <RefreshCw className="h-4 w-4" /> {t("common.retry")}
                  </button>
                </div>
              )}

              {!isLoading && !isError && sorted.length === 0 && (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <p className="text-muted-foreground">{t("tour_list.empty")}</p>
                  <button onClick={handleReset} className="text-sm text-primary hover:underline">
                    {t("common.clear_filter")}
                  </button>
                </div>
              )}

              {!isLoading && visible.length > 0 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
                    {visible.map((tour) => (
                      <TourCard
                        key={tour.slug}
                        slug={tour.slug}
                        image={tour.image}
                        name={pick(tour.name)}
                        city={(() => { const c = cities?.find((c) => c.slug === tour.citySlug); return c ? pick(c.name) : tour.citySlug; })()}
                        duration={`${tour.durationHours} ${t("common.hour")}`}
                        className="w-full"
                      />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-10 text-center">
                      <button
                        onClick={() => setPage((p) => p + 1)}
                        className="px-8 py-3 rounded-xl border border-border text-sm font-medium hover:border-primary hover:text-primary transition-smooth"
                      >
                        {t("common.load_more")} ({t("tour_list.load_more_count", { count: sorted.length - visible.length })})
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default TourListPage;
