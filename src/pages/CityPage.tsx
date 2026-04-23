import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin, CloudSun, ChevronRight, Star, Filter,
  LayoutGrid, UtensilsCrossed, Landmark, Sparkles, CalendarDays, ListChecks,
  Leaf, Apple, Home as HomeIcon, Users
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Button } from "@/components/ui/button";

import heroImg from "@/assets/city-hanoi-hero.jpg";
import phoImg from "@/assets/food-pho.jpg";
import bunchaImg from "@/assets/food-buncha.jpg";
import cafeImg from "@/assets/food-cafetrung.jpg";
import banhcuonImg from "@/assets/food-banhcuon.jpg";
import banhgoiImg from "@/assets/food-banhgoi.jpg";
import cheImg from "@/assets/food-che.jpg";

type Category = "all" | "main" | "snack" | "drink" | "dessert";

const cityData: Record<string, { name: string; tagline: string; weather: string; region: string }> = {
  "ha-noi": { name: "Hà Nội", tagline: "Ngàn năm văn hiến – Nơi tinh hoa hội tụ", weather: "28°C • Trời nắng nhẹ", region: "Thủ đô Việt Nam" },
};

const tabs = [
  { key: "overview", label: "Tổng quan", icon: LayoutGrid },
  { key: "food", label: "Ẩm thực", icon: UtensilsCrossed },
  { key: "places", label: "Điểm tham quan", icon: Landmark },
  { key: "experience", label: "Trải nghiệm", icon: Sparkles },
  { key: "events", label: "Sự kiện", icon: CalendarDays },
  { key: "itinerary", label: "Gợi ý lịch trình", icon: ListChecks },
];

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "main", label: "Món chính" },
  { key: "snack", label: "Món ăn vặt" },
  { key: "drink", label: "Đồ uống" },
  { key: "dessert", label: "Tráng miệng" },
];

const foods = [
  { img: phoImg, name: "Phở Hà Nội", desc: "Tinh hoa ẩm thực đất Kinh kỳ với nước dùng trong, ngọt thanh và hương vị hài hòa.", rating: 4.8, reviews: "2.3K", area: "Phố cổ Hà Nội", tags: ["Món chính"], cat: "main" as Category },
  { img: bunchaImg, name: "Bún chả Hà Nội", desc: "Thịt nướng thơm lừng ăn kèm bún, nước chấm đậm đà.", rating: 4.7, reviews: "1.8K", area: "Quận Hoàn Kiếm", tags: ["Món chính"], cat: "main" as Category },
  { img: cafeImg, name: "Cà phê trứng", desc: "Thức uống độc đáo, béo ngậy hương vị khó quên.", rating: 4.6, reviews: "1.2K", area: "Phố cổ Hà Nội", tags: ["Đồ uống"], cat: "drink" as Category },
  { img: banhcuonImg, name: "Bánh cuốn Thanh Trì", desc: "Bánh mỏng mềm, nhân thịt mộc nhĩ, ăn kèm chả quế.", rating: 4.6, reviews: "980", area: "Huyện Thanh Trì", tags: ["Món chính"], cat: "main" as Category },
  { img: banhgoiImg, name: "Bánh gối", desc: "Vỏ bánh giòn rụm, nhân đậm đà.", rating: 4.5, reviews: "870", area: "Phố cổ Hà Nội", tags: ["Món ăn vặt"], cat: "snack" as Category },
  { img: cheImg, name: "Chè Hà Nội", desc: "Đa dạng và tinh tế với nhiều loại chè truyền thống.", rating: 4.6, reviews: "760", area: "Phố cổ Hà Nội", tags: ["Tráng miệng"], cat: "dessert" as Category },
];

const nearbyPlaces = [
  { img: phoImg, name: "Phở Thìn Bờ Hồ", area: "Phố Lò Đúc", rating: 4.7, distance: "200m" },
  { img: bunchaImg, name: "Bún chả Hương Liên", area: "Phố Lê Văn Hưu", rating: 4.6, distance: "350m" },
  { img: cafeImg, name: "Cà phê Giảng", area: "Ngõ 39 Nguyễn Hữu Huân", rating: 4.7, distance: "450m" },
];

const reasons = [
  { icon: Leaf, title: "Hương vị truyền thống", desc: "Gìn giữ tinh hoa ẩm thực ngàn năm văn hiến." },
  { icon: Apple, title: "Nguyên liệu tươi ngon", desc: "Sử dụng nguyên liệu địa phương tươi sạch, theo mùa." },
  { icon: HomeIcon, title: "Không gian độc đáo", desc: "Thưởng thức ẩm thực trong không gian cổ kính và đậm bản sắc." },
  { icon: Users, title: "Con người thân thiện", desc: "Người Hà Nội thanh lịch, hiếu khách và mến khách." },
];

const CityPage = () => {
  const { slug = "ha-noi" } = useParams();
  const city = cityData[slug] ?? cityData["ha-noi"];
  const [tab, setTab] = useState<string>("overview");
  const [cat, setCat] = useState<Category>("all");

  const filtered = cat === "all" ? foods : foods.filter((f) => f.cat === cat);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative h-[460px] md:h-[520px] w-full overflow-hidden">
        <img src={heroImg} alt={city.name} className="absolute inset-0 h-full w-full object-cover" width={1920} height={768} />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/40 to-foreground/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />

        <div className="relative container h-full pt-28 pb-10 flex flex-col justify-end text-white">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/85 mb-5 animate-fade-up">
            <Link to="/" className="hover:text-white">Trang chủ</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/thanh-pho/ha-noi" className="hover:text-white">Thành phố</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{city.name}</span>
          </nav>

          <div className="flex items-end justify-between gap-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="max-w-2xl">
              <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05]">{city.name}</h1>
              <p className="mt-3 text-base md:text-lg text-white/90">{city.tagline}</p>
              <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-white/85">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {city.region}</span>
                <span className="flex items-center gap-1.5"><CloudSun className="h-4 w-4" /> {city.weather}</span>
              </div>
            </div>

            {/* Michelin badge */}
            <div className="hidden md:flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-michelin text-michelin-foreground flex flex-col items-center justify-center shadow-elegant">
                <span className="text-[9px] font-bold tracking-widest">MICHELIN</span>
                <span className="font-display text-xl font-bold leading-none">2024</span>
              </div>
              <p className="text-xs text-white/85 mt-2 max-w-[140px]">Điểm đến ẩm thực được Michelin gợi ý</p>
            </div>
          </div>
        </div>
      </section>



      <main className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10">
          {/* Left: Food list */}
          <section>
            <h2 className="font-display text-3xl font-semibold text-foreground mb-3">Ẩm thực {city.name}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xl">
              {city.name} là sự hòa quyện tinh tế giữa nét cổ kính và nhịp sống hiện đại,
              thể hiện rõ nhất qua nền ẩm thực phong phú, tinh tế và đậm bản sắc.
            </p>

            {/* Filter chips */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setCat(c.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
                    cat === c.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-muted"
                  }`}
                >
                  {c.label}
                </button>
              ))}
              <Button variant="outline" size="sm" className="rounded-full ml-auto gap-2">
                <Filter className="h-4 w-4" /> Bộ lọc
              </Button>
            </div>

            {/* Food list */}
            <div className="space-y-3">
              {filtered.map((f) => (
                <Link
                  key={f.name}
                  to={`/mon-an/${f.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group flex gap-4 p-3 rounded-2xl bg-card border border-border hover:shadow-card hover:border-primary/30 transition-smooth"
                >
                  <img
                    src={f.img}
                    alt={f.name}
                    loading="lazy"
                    className="h-24 w-24 md:h-28 md:w-28 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-smooth">
                        {f.name}
                      </h3>
                      <span className="flex items-center gap-1 text-xs font-medium shrink-0">
                        <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                        {f.rating} <span className="text-muted-foreground">({f.reviews})</span>
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{f.desc}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {f.area}
                      </span>
                      {f.tags.map((t) => (
                        <span key={t} className="text-[10px] font-medium bg-secondary text-foreground rounded-full px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-5 rounded-xl gap-2">
              Xem thêm món ăn <ChevronRight className="h-4 w-4" />
            </Button>
          </section>

          {/* Right: Map + nearby */}
          <aside className="space-y-6 lg:sticky lg:top-44 lg:self-start">
            <div className="rounded-2xl bg-card border border-border shadow-soft overflow-hidden">
              <div className="flex items-center justify-between p-5 pb-3">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">Bản đồ ẩm thực {city.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Khám phá các địa điểm ăn uống nổi bật</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs gap-1">Mở rộng</Button>
              </div>
              <div className="aspect-[4/3] w-full bg-secondary">
                <iframe
                  title="Bản đồ Hà Nội"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=105.83%2C21.01%2C105.87%2C21.04&layer=mapnik"
                  className="h-full w-full"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-card border border-border shadow-soft p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-base font-semibold text-foreground">Địa điểm nổi bật gần bạn</h3>
                <a href="#" className="text-xs text-primary font-medium hover:underline">Xem tất cả</a>
              </div>
              <div className="space-y-3">
                {nearbyPlaces.map((p) => (
                  <a key={p.name} href="#" className="flex gap-3 p-2 rounded-lg hover:bg-secondary transition-smooth">
                    <img src={p.img} alt={p.name} loading="lazy" className="h-14 w-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{p.area}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-accent text-accent" /> {p.rating}</span>
                        <span className="text-muted-foreground">• {p.distance}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Itinerary CTA */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary p-8 md:p-10 mt-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">Gợi ý lịch trình ẩm thực tại {city.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">Tự tay lên kế hoạch cho chuyến đi ẩm thực đáng nhớ của bạn.</p>
            </div>
            <Button size="lg" className="gap-2 rounded-full shrink-0">Xem gợi ý lịch trình <ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Reasons */}
        <section className="mt-14">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-8">
            Vì sao nên khám phá ẩm thực {city.name}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {reasons.map((r) => (
              <div key={r.title} className="p-6 rounded-2xl bg-card border border-border shadow-soft">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <r.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default CityPage;
