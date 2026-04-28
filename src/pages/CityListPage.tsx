import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Home, ChevronRight, AlertCircle, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CityCard from "@/components/CityCard";
import RegionFilter from "@/components/RegionFilter";
import SortDropdown from "@/components/SortDropdown";
import Chatbot from "@/components/Chatbot";
import { useCities } from "@/hooks/useCities";
import { filterCities } from "@/lib/filter";
import { useLocale } from "@/hooks/useLocale";
import type { Region } from "@/types/content";

const PAGE_SIZE = 9;

const CityListSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="aspect-[3/4] rounded-2xl bg-muted animate-pulse" />
    ))}
  </div>
);

const CityListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const regionParam = searchParams.get("region") as Region | null;
  const [region, setRegion] = useState<Region | "all">(regionParam ?? "all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const { t, pick } = useLocale();

  const { data: cities, isLoading, isError, refetch } = useCities();

  const SORT_OPTIONS = [
    { value: "default", label: t("city_list.sort_default") },
    { value: "name-asc", label: t("city_list.sort_asc") },
    { value: "name-desc", label: t("city_list.sort_desc") },
  ];

  useEffect(() => {
    const r = searchParams.get("region") as Region | null;
    setRegion(r ?? "all");
  }, [searchParams]);

  const handleRegionChange = (r: Region | "all") => {
    setRegion(r);
    setPage(1);
    const params = new URLSearchParams(searchParams);
    if (r === "all") params.delete("region");
    else params.set("region", r);
    setSearchParams(params);
  };

  const filtered = filterCities(cities ?? [], region === "all" ? undefined : region);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "name-asc") return pick(a.name).localeCompare(pick(b.name));
    if (sort === "name-desc") return pick(b.name).localeCompare(pick(a.name));
    return 0;
  });

  const visible = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < sorted.length;

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
            <span className="text-foreground font-medium">{t("city_list.breadcrumb")}</span>
          </nav>

          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">{t("city_list.eyebrow")}</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
              {t("city_list.title")}
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl">
              {t("city_list.desc")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <RegionFilter value={region} onChange={handleRegionChange} />
            <SortDropdown value={sort} options={SORT_OPTIONS} onChange={setSort} />
          </div>

          {isLoading && <CityListSkeleton />}

          {isError && (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <AlertCircle className="h-10 w-10 text-destructive" />
              <p className="text-sm text-muted-foreground">{t("city_list.err")}</p>
              <button
                onClick={() => refetch()}
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm hover:border-primary hover:text-primary transition-smooth"
              >
                <RefreshCw className="h-4 w-4" /> {t("common.retry")}
              </button>
            </div>
          )}

          {!isLoading && !isError && sorted.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <p className="text-muted-foreground">{t("city_list.empty")}</p>
              <button
                onClick={() => handleRegionChange("all")}
                className="text-sm text-primary hover:underline"
              >
                {t("common.clear_filter")}
              </button>
            </div>
          )}

          {!isLoading && sorted.length > 0 && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                {visible.map((city) => (
                  <CityCard
                    key={city.slug}
                    image={city.heroImage}
                    name={pick(city.name)}
                    tagline={pick(city.shortDescription)}
                    slug={city.slug}
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
                    {t("common.load_more")} ({t("city_list.load_more_count", { count: sorted.length - visible.length })})
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default CityListPage;
