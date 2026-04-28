import { useState, FormEvent } from "react";
import { Search, Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale } from "@/hooks/useLocale";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { t, path } = useLocale();

  const NAV_ITEMS = [
    { label: t("nav.cities"), to: path.cityList },
    { label: t("nav.dishes"), to: path.dishList },
    { label: t("nav.tours"), to: path.tourList },
  ];

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = searchValue.trim();
    if (!q) return;
    navigate(`${path.search}?q=${encodeURIComponent(q)}`);
    setSearchValue("");
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-md shadow-soft transition-smooth">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link to="/" aria-label={t("nav.logo_label")}>
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-6" aria-label={t("nav.search_label")}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-smooth hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center gap-2 flex-1 max-w-xs"
          role="search"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={t("nav.search_placeholder")}
              aria-label={t("nav.search_label")}
              className="h-9 w-full rounded-full border border-input bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </form>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
        </div>

        <button
          className="p-2 text-foreground transition-smooth lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t("nav.close_menu") : t("nav.open_menu")}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border shadow-soft animate-fade-up">
          <div className="container flex flex-col py-4 gap-1">
            <form onSubmit={handleSearch} className="flex items-center gap-2 mb-3" role="search">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={t("nav.search_placeholder")}
                  aria-label={t("nav.search_label")}
                  className="w-full h-10 pl-9 pr-3 rounded-md border border-input bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </form>

            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-sm font-medium border-b border-border/50 transition-smooth ${
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex gap-2 pt-3">
              <LanguageSwitcher className="flex-1 flex items-center justify-center gap-2 h-10 px-3 rounded-md border border-input text-sm text-foreground hover:border-primary hover:text-primary transition-smooth" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
