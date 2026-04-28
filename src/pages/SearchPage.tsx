import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Clock, X, MapPin, UtensilsCrossed, Compass, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { useCities } from "@/hooks/useCities";
import { useDishes } from "@/hooks/useDishes";
import { useTours } from "@/hooks/useTours";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { searchAll, type SearchResultType } from "@/lib/search";
import { useLocale } from "@/hooks/useLocale";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get("q") ?? "";
  const typeParam = (searchParams.get("type") ?? "all") as SearchResultType | "all";

  const [query, setQuery] = useState(qParam);
  const [activeType, setActiveType] = useState<SearchResultType | "all">(typeParam);
  const { t, pick, path, locale } = useLocale();

  const TAB_CONFIG: { key: SearchResultType | "all"; label: string; icon: typeof MapPin }[] = [
    { key: "all", label: t("search.tab_all"), icon: Compass },
    { key: "city", label: t("nav.cities"), icon: MapPin },
    { key: "dish", label: t("nav.dishes"), icon: UtensilsCrossed },
    { key: "tour", label: t("nav.tours"), icon: Compass },
  ];

  const RESULT_PATH: Record<SearchResultType, string> = {
    city: path.cityList,
    dish: path.dishList,
    tour: path.tourList,
  };

  const RESULT_LABEL: Record<SearchResultType, string> = {
    city: t("nav.cities"),
    dish: t("nav.dishes"),
    tour: t("nav.tours"),
  };

  const { data: cities, isLoading: citiesLoading } = useCities();
  const { data: dishes, isLoading: dishesLoading } = useDishes();
  const { data: tours, isLoading: toursLoading } = useTours();
  const { searches: recentSearches, addSearch, clearSearches } = useRecentSearches();

  const isLoading = citiesLoading || dishesLoading || toursLoading;

  const results = !isLoading && qParam.trim()
    ? searchAll(qParam, cities ?? [], dishes ?? [], tours ?? [], locale)
    : [];

  const filtered = activeType === "all" ? results : results.filter((r) => r.type === activeType);

  const counts: Record<string, number> = {
    all: results.length,
    city: results.filter((r) => r.type === "city").length,
    dish: results.filter((r) => r.type === "dish").length,
    tour: results.filter((r) => r.type === "tour").length,
  };

  const handleSearch = useCallback((q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    addSearch(trimmed);
    const params = new URLSearchParams(searchParams);
    params.set("q", trimmed);
    setSearchParams(params);
  }, [addSearch, searchParams, setSearchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleTabChange = (type: SearchResultType | "all") => {
    setActiveType(type);
    const params = new URLSearchParams(searchParams);
    if (type === "all") params.delete("type");
    else params.set("type", type);
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    if (qParam) addSearch(qParam);
  }, [qParam]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container max-w-3xl">
          <form onSubmit={handleSubmit} className="relative mb-8" role="search">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              aria-label={t("search.placeholder")}
              autoFocus
              className="w-full h-14 pl-12 pr-14 rounded-2xl border border-input bg-background text-base text-foreground placeholder:text-muted-foreground shadow-soft focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t("search.clear")}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-smooth"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
          </form>

          {!qParam && recentSearches.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Clock className="h-4 w-4 text-muted-foreground" /> {t("search.recent")}
                </p>
                <button
                  onClick={clearSearches}
                  className="text-xs text-muted-foreground hover:text-destructive transition-smooth"
                >
                  {t("common.clear_all")}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setQuery(s); handleSearch(s); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-smooth"
                  >
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {qParam && (
            <>
              <div className="flex gap-1 mb-6 overflow-x-auto pb-1" role="tablist" aria-label={t("search.results_label")}>
                {TAB_CONFIG.map(({ key, label }) => (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={activeType === key}
                    onClick={() => handleTabChange(key)}
                    className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-smooth focus:outline-none focus:ring-2 focus:ring-ring ${
                      activeType === key
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "bg-secondary text-foreground hover:bg-muted"
                    }`}
                  >
                    {label}
                    {counts[key] > 0 && (
                      <span className={`text-xs rounded-full px-1.5 ${
                        activeType === key ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                      }`}>
                        {counts[key]}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {isLoading && (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
                  ))}
                </div>
              )}

              {!isLoading && filtered.length === 0 && (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <AlertCircle className="h-10 w-10 text-muted-foreground" />
                  <p className="font-display text-lg font-semibold text-foreground">{t("search.no_results")}</p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    {t("search.no_results_desc", { query: qParam })}
                  </p>
                  <div className="flex gap-3">
                    <Link to={path.cityList} className="px-4 py-2 rounded-lg border text-sm hover:border-primary hover:text-primary transition-smooth">
                      {t("nav.cities")}
                    </Link>
                    <Link to={path.dishList} className="px-4 py-2 rounded-lg border text-sm hover:border-primary hover:text-primary transition-smooth">
                      {t("nav.dishes")}
                    </Link>
                    <Link to={path.tourList} className="px-4 py-2 rounded-lg border text-sm hover:border-primary hover:text-primary transition-smooth">
                      {t("nav.tours")}
                    </Link>
                  </div>
                </div>
              )}

              {!isLoading && filtered.length > 0 && (
                <div role="list" aria-label={t("search.results_label")} className="space-y-3">
                  {filtered.map((result) => (
                    <Link
                      key={`${result.type}-${result.slug}`}
                      to={`${RESULT_PATH[result.type]}/${result.slug}`}
                      role="listitem"
                      className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-soft transition-smooth group"
                    >
                      <img
                        src={result.image}
                        alt={result.name}
                        loading="lazy"
                        className="h-16 w-16 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-smooth duration-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {RESULT_LABEL[result.type]}
                          </span>
                        </div>
                        <p className="font-display font-semibold text-foreground truncate group-hover:text-primary transition-smooth">
                          {result.name}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                          {result.description}
                        </p>
                      </div>
                    </Link>
                  ))}
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

export default SearchPage;
