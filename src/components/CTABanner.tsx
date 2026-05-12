import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveImage } from "@/lib/imageMap";
import { useLocale } from "@/hooks/useLocale";
import { LazyImage } from "@/components/ui/lazy-image";

const ctaImg = resolveImage("cta-banner");

const CTABanner = () => {
  const { t } = useLocale();
  return (
  <section data-tour="home-cta" className="container pb-20">
    <div className="relative overflow-hidden rounded-2xl shadow-elegant">
      <LazyImage
        src={ctaImg}
        alt={t("cta.img_alt")}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/40" />
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 px-6 md:px-12 py-12 md:py-16">
        <div className="text-primary-foreground max-w-xl">
          <h2 className="font-display text-2xl md:text-4xl font-semibold mb-3">
            {t("cta.title")}
          </h2>
          <p className="text-primary-foreground/85 text-sm md:text-base">
            {t("cta.desc")}
          </p>
        </div>
        <Button size="lg" variant="secondary" className="gap-2 self-start md:self-auto rounded-full px-7">
          {t("cta.btn")} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </section>
  );
};

export default CTABanner;
