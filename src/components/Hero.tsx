import { Search, MapPin, UtensilsCrossed, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-hoian.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[760px] w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Phố cổ Hội An rực rỡ ánh đèn lồng buổi tối"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1088}
      />
      <div className="absolute inset-0 gradient-hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-transparent to-foreground/60" />

      <div className="relative container flex min-h-[760px] flex-col justify-center pt-28 pb-12">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Dấu ấn hương vị Việt
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] text-white">
            Khám phá tinh hoa
            <br />
            ẩm thực Việt
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-white/85 leading-relaxed">
            Hành trình vị giác — Kết nối văn hóa — Lan tỏa tinh hoa
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mt-10 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="rounded-2xl bg-background/95 backdrop-blur shadow-elegant p-2 md:p-3">
            <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-2 items-center">
              <div className="flex items-center gap-3 px-4 py-3 md:py-2">
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground">Bạn muốn khám phá ẩm thực ở đâu?</p>
                  <input
                    placeholder="Tìm thành phố, món ăn, hoặc trải nghiệm…"
                    className="w-full bg-transparent text-sm text-muted-foreground placeholder:text-muted-foreground outline-none"
                  />
                </div>
              </div>

              <SearchField icon={MapPin} label="Địa điểm" value="Tất cả địa điểm" />
              <SearchField icon={UtensilsCrossed} label="Ẩm thực" value="Tất cả loại hình" />
              <SearchField icon={Calendar} label="Thời gian" value="Chọn thời gian" />

              <Button size="lg" className="h-14 px-8 gap-2 rounded-xl">
                <Search className="h-4 w-4" /> Tìm kiếm
              </Button>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 text-xs text-white/80">
            <span>Được đề xuất bởi</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#00AA6C] text-white font-bold tracking-tight">
              <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white"><circle cx="12" cy="12" r="10"/></svg>
              Tripadvisor
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const SearchField = ({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) => (
  <button className="flex items-center gap-3 px-4 py-3 md:py-2 rounded-xl hover:bg-secondary transition-smooth text-left">
    <Icon className="h-5 w-5 text-primary shrink-0" />
    <div className="min-w-0">
      <p className="text-xs font-medium text-foreground">{label}</p>
      <p className="text-sm text-muted-foreground truncate">{value}</p>
    </div>
  </button>
);

export default Hero;
