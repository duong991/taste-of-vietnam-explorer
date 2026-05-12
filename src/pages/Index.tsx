import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
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
import HomeTour from "@/components/onboarding/HomeTour";
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
  const { t, pick, path } = useLocale();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div data-tour="home-hero">
          <Hero />
        </div>

        <section id="section-cities" data-tour="home-search" className="container py-16 md:py-20">
          <SectionHeader
            eyebrow={t("home.cities_eyebrow")}
            title={t("home.cities_title")}
          />
          {citiesLoading && (
            <Carousel>
              {Array.from({ length: CARD_SKELETON_COUNT }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </Carousel>
          )}
          {citiesError && <SectionError message={t("home.err_cities")} />}
          {cities && cities.length > 0 && (
            <Carousel>
              {cities.map((city) => (
                <CityCard
                  key={city.slug}
                  image={city.heroImage}
                  name={pick(city.name)}
                  tagline={pick(city.shortDescription)}
                  slug={city.slug}
                />
              ))}
            </Carousel>
          )}
        </section>

        <section id="mon-an" data-tour="home-featured-dishes" className="container py-12 md:py-16">
          <SectionHeader
            eyebrow={t("home.dishes_eyebrow")}
            title={t("home.dishes_title")}
          />
          {dishesLoading && (
            <Carousel>
              {Array.from({ length: CARD_SKELETON_COUNT }).map((_, i) => (
                <CardSkeleton key={i} aspect="aspect-square" />
              ))}
            </Carousel>
          )}
          {dishesError && <SectionError message={t("home.err_dishes")} />}
          {dishes && dishes.length > 0 && (
            <Carousel>
              {dishes.slice(0, 6).map((dish) => (
                <FoodCard
                  key={dish.slug}
                  slug={dish.slug}
                  image={dish.image}
                  name={pick(dish.name)}
                  city={(() => { const c = cities?.find((c) => c.slug === dish.citySlug); return c ? pick(c.name) : dish.citySlug; })()}
                />
              ))}
            </Carousel>
          )}
        </section>

        <section id="tour" data-tour="home-featured-tours" className="container py-12 md:py-16">
          <SectionHeader
            eyebrow={t("home.tours_eyebrow")}
            title={t("home.tours_title")}
            action={
              <Link to={path.tourList} className="text-sm font-medium text-primary hover:underline">
                {t("common.see_all")}
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
          {toursError && <SectionError message={t("home.err_tours")} />}
          {tours && tours.length > 0 && (
            <Carousel>
              {tours.map((tour) => (
                <TourCard
                  key={tour.slug}
                  slug={tour.slug}
                  image={tour.image}
                  name={pick(tour.name)}
                  city={(() => { const c = cities?.find((c) => c.slug === tour.citySlug); return c ? pick(c.name) : tour.citySlug; })()}
                  duration={`${tour.durationHours} ${t("common.hour")}`}
                />
              ))}
            </Carousel>
          )}
        </section>

        <Features />
        <div data-tour="home-cta">
          <CTABanner />
        </div>
      </main>
      <Footer />
      <Chatbot />
      <HomeTour />
    </div>
  );
};

export default Index;
