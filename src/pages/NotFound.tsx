import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Compass, Search, Home, UtensilsCrossed } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SUGGESTIONS = [
  { to: "/thanh-pho", icon: Compass, label: "Khám phá thành phố", desc: "Từ Hà Nội đến Cần Thơ" },
  { to: "/mon-an", icon: UtensilsCrossed, label: "Tìm món ăn", desc: "Phở, Bún chả, Cao lầu…" },
  { to: "/tim-kiem", icon: Search, label: "Tìm kiếm", desc: "Nhập từ khoá để khám phá" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 — Route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-20 pb-16 px-4">
        <div className="text-center max-w-lg w-full animate-fade-up">
          <p className="text-[80px] md:text-[120px] font-display font-bold leading-none text-primary/10 select-none">
            404
          </p>

          <div className="-mt-4 mb-6">
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Trang không tồn tại
            </h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Trang bạn đang tìm không còn ở đây. Hãy thử khám phá các nội dung bên dưới.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {SUGGESTIONS.map(({ to, icon: Icon, label, desc }) => (
              <Link
                key={to}
                to={to}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-soft transition-smooth group"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-smooth">
                  {label}
                </p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </Link>
            ))}
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <Home className="h-4 w-4" />
            Về trang chủ
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
