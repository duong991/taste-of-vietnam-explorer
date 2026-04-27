import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ChevronRight, AlertCircle, RefreshCw, MapPin, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareBar from "@/components/ShareBar";
import FoodCard from "@/components/FoodCard";
import TourCard from "@/components/TourCard";
import Chatbot from "@/components/Chatbot";
import { useDish } from "@/hooks/useDish";
import { useDishes } from "@/hooks/useDishes";
import { useCities } from "@/hooks/useCities";
import { useTours } from "@/hooks/useTours";
import { Markdown } from "@/lib/markdown";

const REGION_LABEL: Record<string, string> = {
  bac: "Miền Bắc",
  trung: "Miền Trung",
  nam: "Miền Nam",
};

const TYPE_LABEL: Record<string, string> = {
  savory: "Mặn",
  vegetarian: "Chay",
  street: "Đường phố",
  "fine-dining": "Cao cấp",
};

const TASTE_LABEL: Record<string, string> = {
  spicy: "Cay",
  sweet: "Ngọt",
  sour: "Chua",
  salty: "Mặn",
  umami: "Đậm đà",
};

const DetailSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-80 md:h-[480px] rounded-2xl bg-muted" />
    <div className="space-y-3">
      <div className="h-8 w-2/3 bg-muted rounded-lg" />
      <div className="h-4 w-1/2 bg-muted rounded" />
      <div className="h-4 w-full bg-muted rounded" />
      <div className="h-4 w-5/6 bg-muted rounded" />
    </div>
  </div>
);

const DishDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: dish, isLoading, isError, refetch } = useDish(slug);
  const { data: allDishes } = useDishes();
  const { data: cities } = useCities();
  const { data: tours } = useTours();

  useEffect(() => {
    if (!isLoading && !isError && !dish) {
      navigate("/404", { replace: true });
    }
  }, [isLoading, isError, dish, navigate]);

  const city = cities?.find((c) => c.slug === dish?.citySlug);
  const relatedDishes = allDishes?.filter((d) => d.citySlug === dish?.citySlug && d.slug !== dish?.slug).slice(0, 4) ?? [];
  const relatedTours = tours?.filter((t) => t.highlightDishSlugs.includes(slug ?? "")).slice(0, 4) ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 container max-w-4xl">
          <DetailSkeleton />
        </main>
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
            <p className="text-sm text-muted-foreground">Không tải được thông tin món ăn.</p>
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

  if (!dish) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="flex items-center gap-1 hover:text-primary transition-smooth">
              <Home className="h-3.5 w-3.5" /> Trang chủ
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/mon-an" className="hover:text-primary transition-smooth">Món ăn</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{dish.name.vi}</span>
          </nav>

          <div className="relative aspect-[16/8] md:aspect-[16/7] rounded-2xl overflow-hidden mb-8 shadow-elegant">
            <img
              src={dish.image}
              alt={dish.name.vi}
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                {dish.name.vi}
              </h1>
              {city && (
                <p className="flex items-center gap-1.5 text-sm text-white/80 mt-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <Link to={`/thanh-pho/${city.slug}`} className="hover:text-white transition-smooth">
                    {city.name.vi}
                  </Link>
                  <span className="mx-1 opacity-50">·</span>
                  <span>{REGION_LABEL[dish.region]}</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {dish.type.map((t) => (
              <span key={t} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-xs font-medium text-foreground">
                <Tag className="h-3 w-3 text-muted-foreground" />
                {TYPE_LABEL[t] ?? t}
              </span>
            ))}
            {dish.taste.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-medium">
                {TASTE_LABEL[t] ?? t}
              </span>
            ))}
          </div>

          <Markdown className="mb-8">{dish.story.vi}</Markdown>

          <div className="p-5 rounded-2xl bg-secondary border border-border mb-10">
            <h2 className="font-display text-lg font-semibold text-foreground mb-3">Nguyên liệu chính</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{dish.ingredients.vi}</p>
          </div>

          <div className="mb-10">
            <ShareBar title={dish.name.vi} />
          </div>
        </div>

        {relatedDishes.length > 0 && (
          <section className="container mt-8">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
              Món ăn khác tại {city?.name.vi}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {relatedDishes.map((d) => (
                <FoodCard
                  key={d.slug}
                  slug={d.slug}
                  image={d.image}
                  name={d.name.vi}
                  city={city?.name.vi ?? d.citySlug}
                />
              ))}
            </div>
          </section>
        )}

        {relatedTours.length > 0 && (
          <section className="container mt-12">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
              Tour liên quan đến {dish.name.vi}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedTours.map((tour) => (
                <TourCard
                  key={tour.slug}
                  slug={tour.slug}
                  image={tour.image}
                  name={tour.name.vi}
                  city={cities?.find((c) => c.slug === tour.citySlug)?.name.vi ?? tour.citySlug}
                  duration={`${tour.durationHours} giờ`}
                  price={new Intl.NumberFormat("vi-VN").format(tour.priceVnd) + " đ"}
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

export default DishDetailPage;
