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

const PAGE_SIZE = 9;

const SORT_OPTIONS = [
  { value: "default", label: "Mặc định" },
  { value: "price-asc", label: "Giá: thấp → cao" },
  { value: "price-desc", label: "Giá: cao → thấp" },
  { value: "duration-asc", label: "Thời gian: ngắn nhất" },
];

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
    priceMin: filters.priceRange?.[0],
    priceMax: filters.priceRange?.[1],
  });

  const sorted = sortTours(filtered, sort);
  const visible = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < sorted.length;

  const cityOptions = (cities ?? []).map((c) => ({ value: c.slug, label: c.name.vi }));

  const formatPrice = (vnd: number) => new Intl.NumberFormat("vi-VN").format(vnd) + " đ";

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
            <span className="text-foreground font-medium">Tour ẩm thực</span>
          </nav>

          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">Trải nghiệm</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
              Tour ẩm thực Việt Nam
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Hành trình vị giác — từ phố cổ Hà Nội đến miền Tây sông nước.
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
                  {isLoading ? "Đang tải…" : `${sorted.length} tour`}
                </p>
                <SortDropdown value={sort} options={SORT_OPTIONS} onChange={(v) => setSort(v as TourSortKey)} />
              </div>

              {isLoading && <GridSkeleton />}

              {isError && (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <AlertCircle className="h-10 w-10 text-destructive" />
                  <p className="text-sm text-muted-foreground">Không tải được danh sách tour.</p>
                  <button
                    onClick={() => refetch()}
                    className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm hover:border-primary hover:text-primary transition-smooth"
                  >
                    <RefreshCw className="h-4 w-4" /> Thử lại
                  </button>
                </div>
              )}

              {!isLoading && !isError && sorted.length === 0 && (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <p className="text-muted-foreground">Không có tour phù hợp với bộ lọc.</p>
                  <button onClick={handleReset} className="text-sm text-primary hover:underline">
                    Xoá tất cả bộ lọc
                  </button>
                </div>
              )}

              {!isLoading && visible.length > 0 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {visible.map((tour) => (
                      <TourCard
                        key={tour.slug}
                        slug={tour.slug}
                        image={tour.image}
                        name={tour.name.vi}
                        city={cities?.find((c) => c.slug === tour.citySlug)?.name.vi ?? tour.citySlug}
                        duration={`${tour.durationHours} giờ`}
                        price={formatPrice(tour.priceVnd)}
                      />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-10 text-center">
                      <button
                        onClick={() => setPage((p) => p + 1)}
                        className="px-8 py-3 rounded-xl border border-border text-sm font-medium hover:border-primary hover:text-primary transition-smooth"
                      >
                        Xem thêm ({sorted.length - visible.length} tour còn lại)
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
