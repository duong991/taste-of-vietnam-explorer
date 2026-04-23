import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ctaImg from "@/assets/cta-banner.jpg";

const CTABanner = () => (
  <section className="container pb-20">
    <div className="relative overflow-hidden rounded-2xl shadow-elegant">
      <img
        src={ctaImg}
        alt="Mâm cỗ Việt Nam"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/40" />
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 px-6 md:px-12 py-12 md:py-16">
        <div className="text-primary-foreground max-w-xl">
          <h2 className="font-display text-2xl md:text-4xl font-semibold mb-3">
            Sẵn sàng cho hành trình ẩm thực của bạn?
          </h2>
          <p className="text-primary-foreground/85 text-sm md:text-base">
            Khám phá, trải nghiệm và lưu giữ hương vị Việt Nam.
          </p>
        </div>
        <Button size="lg" variant="secondary" className="gap-2 self-start md:self-auto rounded-full px-7">
          Bắt đầu khám phá <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </section>
);

export default CTABanner;
