import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Home, ChevronRight, AlertCircle, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import FilterSidebar, { type DishFilters } from "@/components/FilterSidebar";
import SortDropdown from "@/components/SortDropdown";
import Chatbot from "@/components/Chatbot";
import { useDishes } from "@/hooks/useDishes";
import { useCities } from "@/hooks/useCities";
import { filterDishes, sortDishes, type DishSortKey } from "@/lib/filter";
import type { Region } from "@/types/content";

const PAGE_SIZE = 12;

const SORT_OPTIONS = [
  { value: "default", label: "Mặc định" },
  { value: "name-asc", label: "A → Z" },
  { value: "name-desc", label: "Z → A" },
];

const GridSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="rounded-2xl bg-muted animate-pulse aspect-[3/4]" />
    ))}
  </div>
);

const EMPTY_FILTERS: DishFilters = { regions: [], types: [], tastes: [] };

const DishListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<DishFilters>({
    regions: searchParams.get("region") ? ([searchParams.get("region")] as Region[]) : [],
    types: searchParams.get("type") ? [searchParams.get("type")!] : [],
    tastes: searchParams.get("taste") ? [searchParams.get("taste")!] : [],
  });
  const [citySlug, setCitySlug] = useState(searchParams.get("city") ?? "");
  const [sort, setSort] = useState<DishSortKey>("default");
  const [page, setPage] = useState(1);

  const { data: dishes, isLoading, isError, refetch } = useDishes();
  const { data: cities } = useCities();

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.regions[0]) params.set("region", filters.regions[0]);
    if (filters.types[0]) params.set("type", filters.types[0]);
    if (filters.tastes[0]) params.set("taste", filters.tastes[0]);
    if (citySlug) params.set("city", citySlug);
    setSearchParams(params, { replace: true });
    setPage(1);
  }, [filters, citySlug, setSearchParams]);

  const filtered = filterDishes(dishes ?? [], {
    region: filters.regions[0] as Region | undefined,
    citySlug: citySlug || undefined,
    types: filters.types,
    tastes: filters.tastes,
  });

  const sorted = sortDishes(filtered, sort);
  const visible = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < sorted.length;

  const cityOptions = (cities ?? []).map((c) => ({ value: c.slug, label: c.name.vi }));

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
              <Home className="h-3.5 w-3.5" /> Trang chủ
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Món ăn</span>
          </nav>

          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">Tinh hoa ẩm thực</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
              Khám phá món ăn Việt Nam
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-56 xl:w-64 shrink-0">
              <FilterSidebar
                mode="dish"
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
                  {isLoading ? "Đang tải…" : `${sorted.length} món ăn`}
                </p>
                <SortDropdown value={sort} options={SORT_OPTIONS} onChange={(v) => setSort(v as DishSortKey)} />
              </div>

              {isLoading && <GridSkeleton />}

              {isError && (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <AlertCircle className="h-10 w-10 text-destructive" />
                  <p className="text-sm text-muted-foreground">Không tải được danh sách món ăn.</p>
                  <button
                    onClick={() => refetch()}
                    className="flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm hover:border-primary hover:text-primary transition-smooth"
                  >
                    <RefreshCw className="h-4 w-4" /> Thử lại
                  </button>
                </div>
              )}

              {!isLoading && !isError && sorted.length === 0 && (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <p className="text-muted-foreground">Không có món ăn phù hợp với bộ lọc.</p>
                  <button onClick={handleReset} className="text-sm text-primary hover:underline">
                    Xoá tất cả bộ lọc
                  </button>
                </div>
              )}

              {!isLoading && visible.length > 0 && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
                    {visible.map((dish) => (
                      <FoodCard
                        key={dish.slug}
                        slug={dish.slug}
                        image={dish.image}
                        name={dish.name.vi}
                        city={cities?.find((c) => c.slug === dish.citySlug)?.name.vi ?? dish.citySlug}
                      />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-10 text-center">
                      <button
                        onClick={() => setPage((p) => p + 1)}
                        className="px-8 py-3 rounded-xl border border-border text-sm font-medium hover:border-primary hover:text-primary transition-smooth"
                      >
                        Xem thêm ({sorted.length - visible.length} món còn lại)
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

export default DishListPage;
