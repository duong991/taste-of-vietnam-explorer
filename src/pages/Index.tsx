import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import Carousel from "@/components/Carousel";
import CityCard from "@/components/CityCard";
import FoodCard from "@/components/FoodCard";
import TourCard from "@/components/TourCard";
import Features from "@/components/Features";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { useCities } from "@/hooks/useCities";
import { useDishes } from "@/hooks/useDishes";
import { useTours } from "@/hooks/useTours";

const CARD_SKELETON_COUNT = 4;

const CardSkeleton = ({ aspect }: { aspect?: string }) => (
  <div
    className={`shrink-0 snap-start w-[260px] md:w-[280px] ${aspect ?? "aspect-[3/4]"} rounded-2xl bg-muted animate-pulse`}
  />
);

const SectionError = ({ message }: { message: string }) => (
  <div className="flex items-center gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive text-sm">
    <AlertCircle className="h-4 w-4 shrink-0" />
    <span>{message}</span>
  </div>
);

const Index = () => {
  const { data: cities, isLoading: citiesLoading, isError: citiesError } = useCities();
  const { data: dishes, isLoading: dishesLoading, isError: dishesError } = useDishes();
  const { data: tours, isLoading: toursLoading, isError: toursError } = useTours();

  const formatPrice = (vnd: number) =>
    new Intl.NumberFormat("vi-VN").format(vnd) + " đ";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />

        <section id="section-cities" className="container py-16 md:py-20">
          <SectionHeader
            eyebrow="Khám phá các thành phố"
            title="Đi khắp Việt Nam, thưởng thức hương vị địa phương"
          />
          {citiesLoading && (
            <Carousel>
              {Array.from({ length: CARD_SKELETON_COUNT }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </Carousel>
          )}
          {citiesError && <SectionError message="Không tải được danh sách thành phố. Tải lại trang." />}
          {cities && cities.length > 0 && (
            <Carousel>
              {cities.map((city) => (
                <CityCard
                  key={city.slug}
                  image={city.heroImage}
                  name={city.name.vi}
                  tagline={city.shortDescription.vi}
                  slug={city.slug}
                />
              ))}
            </Carousel>
          )}
        </section>

        <section id="mon-an" className="container py-12 md:py-16">
          <SectionHeader
            eyebrow="Món ngon nổi bật"
            title="Những món ăn làm nên thương hiệu Việt"
          />
          {dishesLoading && (
            <Carousel>
              {Array.from({ length: CARD_SKELETON_COUNT }).map((_, i) => (
                <CardSkeleton key={i} aspect="aspect-square" />
              ))}
            </Carousel>
          )}
          {dishesError && <SectionError message="Không tải được danh sách món ăn. Tải lại trang." />}
          {dishes && dishes.length > 0 && (
            <Carousel>
              {dishes.slice(0, 6).map((dish) => (
                <FoodCard
                  key={dish.slug}
                  slug={dish.slug}
                  image={dish.image}
                  name={dish.name.vi}
                  city={cities?.find((c) => c.slug === dish.citySlug)?.name.vi ?? dish.citySlug}
                />
              ))}
            </Carousel>
          )}
        </section>

        <section id="tour" className="container py-12 md:py-16">
          <SectionHeader
            eyebrow="Tour ẩm thực trải nghiệm"
            title="Những hành trình vị giác không thể bỏ lỡ"
            action={
              <Link to="/tour" className="text-sm font-medium text-primary hover:underline">
                Xem tất cả →
              </Link>
            }
          />
          {toursLoading && (
            <Carousel>
              {Array.from({ length: CARD_SKELETON_COUNT }).map((_, i) => (
                <CardSkeleton key={i} aspect="aspect-[4/3]" />
              ))}
            </Carousel>
          )}
          {toursError && <SectionError message="Không tải được danh sách tour. Tải lại trang." />}
          {tours && tours.length > 0 && (
            <Carousel>
              {tours.map((tour) => (
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
            </Carousel>
          )}
        </section>

        <Features />
        <CTABanner />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
