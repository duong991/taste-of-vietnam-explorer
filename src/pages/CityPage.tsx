import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ChevronRight, AlertCircle, RefreshCw, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import ShareBar from "@/components/ShareBar";
import FoodCard from "@/components/FoodCard";
import TourCard from "@/components/TourCard";
import Chatbot from "@/components/Chatbot";
import { useCity } from "@/hooks/useCity";
import { useDishes } from "@/hooks/useDishes";
import { useTours } from "@/hooks/useTours";
import { Markdown } from "@/lib/markdown";

const REGION_LABEL: Record<string, string> = {
  bac: "Miền Bắc",
  trung: "Miền Trung",
  nam: "Miền Nam",
};

const DetailSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-[420px] rounded-none md:rounded-2xl bg-muted" />
    <div className="container space-y-3">
      <div className="h-8 w-1/2 bg-muted rounded-lg" />
      <div className="h-4 w-full bg-muted rounded" />
      <div className="h-4 w-5/6 bg-muted rounded" />
    </div>
  </div>
);

const CityPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: city, isLoading, isError, refetch } = useCity(slug);
  const { data: dishes } = useDishes();
  const { data: tours } = useTours();

  useEffect(() => {
    if (!isLoading && !isError && !city) navigate("/404", { replace: true });
  }, [isLoading, isError, city, navigate]);

  const featuredDishes = dishes?.filter((d) => city?.featuredDishSlugs.includes(d.slug)) ?? [];
  const featuredTours = tours?.filter((t) => city?.featuredTourSlugs.includes(t.slug)) ?? [];
  const formatPrice = (vnd: number) => new Intl.NumberFormat("vi-VN").format(vnd) + " đ";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20"><DetailSkeleton /></main>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 container">
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <AlertCircle className="h-10 w-10 text-destructive" />
            <p className="text-sm text-muted-foreground">Không tải được thông tin thành phố.</p>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 rounded-md border text-sm hover:border-primary hover:text-primary transition-smooth"
            >
              <RefreshCw className="h-4 w-4" /> Thử lại
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!city) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative min-h-[480px] w-full overflow-hidden">
        <img
          src={city.heroImage}
          alt={city.name.vi}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/40 to-foreground/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

        <div className="relative container h-full pt-28 pb-12 flex flex-col justify-end text-white min-h-[480px]">
          <nav className="flex items-center gap-1.5 text-xs text-white/80 mb-5 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="flex items-center gap-1 hover:text-white transition-smooth">
              <Home className="h-3.5 w-3.5" /> Trang chủ
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/thanh-pho" className="hover:text-white transition-smooth">Thành phố</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{city.name.vi}</span>
          </nav>

          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
              {REGION_LABEL[city.region]}
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05]">
              {city.name.vi}
            </h1>
            <p className="mt-4 text-lg text-white/90 max-w-xl leading-relaxed">
              {city.shortDescription.vi}
            </p>
            {city.geo && (
              <p className="mt-3 flex items-center gap-1.5 text-sm text-white/70">
                <MapPin className="h-4 w-4" />
                {city.geo.lat.toFixed(4)}°N, {city.geo.lng.toFixed(4)}°E
              </p>
            )}
          </div>
        </div>
      </section>

      <main className="pb-16">
        <div className="container max-w-4xl py-12">
          <Markdown className="mb-10">{city.story.vi}</Markdown>

          <div className="mb-10">
            <ShareBar title={city.name.vi} />
          </div>
        </div>

        {city.gallery.length > 0 && (
          <section className="container mb-14">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Ảnh {city.name.vi}</h2>
            <Gallery images={city.gallery} alt={city.name.vi} />
          </section>
        )}

        {city.geo && (
          <section className="container max-w-4xl mb-14">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Bản đồ</h2>
            <div className="aspect-[16/7] rounded-2xl overflow-hidden border border-border shadow-soft">
              <iframe
                title={`Bản đồ ${city.name.vi}`}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${city.geo.lng - 0.05}%2C${city.geo.lat - 0.04}%2C${city.geo.lng + 0.05}%2C${city.geo.lat + 0.04}&layer=mapnik&marker=${city.geo.lat}%2C${city.geo.lng}`}
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </section>
        )}

        {featuredDishes.length > 0 && (
          <section className="container mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Món ăn đặc trưng
              </h2>
              <Link to={`/mon-an?city=${city.slug}`} className="text-sm font-medium text-primary hover:underline">
                Xem tất cả →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {featuredDishes.map((dish) => (
                <FoodCard
                  key={dish.slug}
                  slug={dish.slug}
                  image={dish.image}
                  name={dish.name.vi}
                  city={city.name.vi}
                />
              ))}
            </div>
          </section>
        )}

        {featuredTours.length > 0 && (
          <section className="container mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Tour ẩm thực tại {city.name.vi}
              </h2>
              <Link to={`/tour?city=${city.slug}`} className="text-sm font-medium text-primary hover:underline">
                Xem tất cả →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTours.map((tour) => (
                <TourCard
                  key={tour.slug}
                  slug={tour.slug}
                  image={tour.image}
                  name={tour.name.vi}
                  city={city.name.vi}
                  duration={`${tour.durationHours} giờ`}
                  price={formatPrice(tour.priceVnd)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default CityPage;
