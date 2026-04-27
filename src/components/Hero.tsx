import { useState, FormEvent } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-hoian.jpg";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/tim-kiem?q=${encodeURIComponent(q)}`);
  };

  const scrollToCities = () => {
    document.getElementById("section-cities")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[760px] w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Phố cổ Hội An rực rỡ ánh đèn lồng buổi tối"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1088}
        fetchPriority="high"
      />
      <div className="absolute inset-0 gradient-hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-transparent to-foreground/60" />

      <div className="relative container flex min-h-[760px] flex-col justify-center pt-28 pb-16">
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

        <form
          onSubmit={handleSearch}
          className="relative mt-10 animate-fade-up"
          style={{ animationDelay: "0.15s" }}
          role="search"
        >
          <div className="rounded-2xl bg-background/95 backdrop-blur shadow-elegant p-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3 px-4 py-3 flex-1 min-w-0">
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm thành phố, món ăn, tour trải nghiệm…"
                  aria-label="Tìm kiếm ẩm thực"
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 h-12 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </form>

        <div className="mt-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <button
            onClick={scrollToCities}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-smooth"
            aria-label="Khám phá ngay"
          >
            Khám phá ngay
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
