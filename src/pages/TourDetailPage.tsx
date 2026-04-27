import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, ChevronRight, AlertCircle, RefreshCw, Clock, Wallet, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShareBar from "@/components/ShareBar";
import Itinerary from "@/components/Itinerary";
import PartnerContactBar from "@/components/PartnerContactBar";
import TourCard from "@/components/TourCard";
import FoodCard from "@/components/FoodCard";
import Chatbot from "@/components/Chatbot";
import { useTour } from "@/hooks/useTour";
import { useTours } from "@/hooks/useTours";
import { useCities } from "@/hooks/useCities";
import { useDishes } from "@/hooks/useDishes";
import { usePartner } from "@/hooks/usePartners";

const THEME_LABEL: Record<string, string> = {
  "street-food": "Ẩm thực đường phố",
  "fine-dining": "Nhà hàng cao cấp",
  "cooking-class": "Lớp nấu ăn",
  market: "Chợ truyền thống",
  culture: "Văn hoá",
  walking: "Đi bộ",
  motorbike: "Xe máy",
  "river-food": "Sông nước",
  adventure: "Phiêu lưu",
  "hands-on": "Tự tay làm",
};

const DetailSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-80 md:h-[420px] rounded-2xl bg-muted" />
    <div className="space-y-3">
      <div className="h-8 w-2/3 bg-muted rounded-lg" />
      <div className="h-4 w-1/3 bg-muted rounded" />
    </div>
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 bg-muted rounded-xl" />)}
    </div>
  </div>
);

const TourDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: tour, isLoading, isError, refetch } = useTour(slug);
  const { data: tours } = useTours();
  const { data: cities } = useCities();
  const { data: dishes } = useDishes();
  const { data: partner } = usePartner(tour?.partnerId);

  useEffect(() => {
    if (!isLoading && !isError && !tour) navigate("/404", { replace: true });
  }, [isLoading, isError, tour, navigate]);

  const city = cities?.find((c) => c.slug === tour?.citySlug);
  const highlightDishes = dishes?.filter((d) => tour?.highlightDishSlugs.includes(d.slug)).slice(0, 4) ?? [];
  const relatedTours = tours?.filter((t) => t.citySlug === tour?.citySlug && t.slug !== tour?.slug).slice(0, 3) ?? [];
  const formatPrice = (vnd: number) => new Intl.NumberFormat("vi-VN").format(vnd) + " đ";

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
            <p className="text-sm text-muted-foreground">Không tải được thông tin tour.</p>
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

  if (!tour) return null;

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
            <Link to="/tour" className="hover:text-primary transition-smooth">Tour ẩm thực</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{tour.name.vi}</span>
          </nav>

          <div className="relative aspect-[16/8] rounded-2xl overflow-hidden mb-8 shadow-elegant">
            <img src={tour.image} alt={tour.name.vi} className="h-full w-full object-cover" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex flex-wrap gap-2 mb-3">
                {tour.themes.slice(0, 3).map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-medium">
                    {THEME_LABEL[t] ?? t}
                  </span>
                ))}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                {tour.name.vi}
              </h1>
              {city && (
                <p className="text-sm text-white/80 mt-1.5">
                  <Link to={`/thanh-pho/${city.slug}`} className="hover:text-white transition-smooth">
                    {city.name.vi}
                  </Link>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary border border-border">
              <Clock className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Thời gian</p>
                <p className="font-semibold text-foreground">{tour.durationHours} giờ</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary border border-border">
              <Wallet className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Giá từ</p>
                <p className="font-semibold text-primary">{formatPrice(tour.priceVnd)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary border border-border col-span-2 sm:col-span-1">
              <Users className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Đối tác</p>
                <p className="font-semibold text-foreground truncate">{partner?.name ?? tour.partnerId}</p>
              </div>
            </div>
          </div>

          <section className="mb-10">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Lịch trình</h2>
            <Itinerary steps={tour.itinerary} locale="vi" />
          </section>

          {partner && (
            <section className="mb-10 p-6 rounded-2xl border border-border bg-secondary">
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">{partner.name}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{partner.description.vi}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Liên hệ đặt tour
              </p>
              <PartnerContactBar partner={partner} />
            </section>
          )}

          <div className="mb-10">
            <ShareBar title={tour.name.vi} />
          </div>
        </div>

        {highlightDishes.length > 0 && (
          <section className="container mt-8">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Những món ăn trong tour</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {highlightDishes.map((d) => (
                <FoodCard
                  key={d.slug}
                  slug={d.slug}
                  image={d.image}
                  name={d.name.vi}
                  city={cities?.find((c) => c.slug === d.citySlug)?.name.vi ?? d.citySlug}
                />
              ))}
            </div>
          </section>
        )}

        {relatedTours.length > 0 && (
          <section className="container mt-12">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
              Tour khác tại {city?.name.vi}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedTours.map((t) => (
                <TourCard
                  key={t.slug}
                  slug={t.slug}
                  image={t.image}
                  name={t.name.vi}
                  city={cities?.find((c) => c.slug === t.citySlug)?.name.vi ?? t.citySlug}
                  duration={`${t.durationHours} giờ`}
                  price={formatPrice(t.priceVnd)}
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

export default TourDetailPage;
