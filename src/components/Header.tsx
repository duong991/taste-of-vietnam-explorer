import { useEffect, useState } from "react";
import { Heart, Globe, User, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Khám phá", href: "#kham-pha" },
  { label: "Thành phố", href: "#thanh-pho" },
  { label: "Món ăn", href: "#mon-an" },
  { label: "Tour", href: "#tour" },
  { label: "Blog", href: "#blog" },
  { label: "Về chúng tôi", href: "#ve-chung-toi" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-smooth ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between gap-6">
        <a href="/" aria-label="Tinh hoa Hương vị Việt">
          <Logo />
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-smooth hover:text-primary ${
                scrolled ? "text-foreground" : "text-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden xl:inline">Yêu thích</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Globe className="h-4 w-4" />
            VI
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <User className="h-4 w-4" />
          </Button>
        </div>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border shadow-soft animate-fade-up">
          <nav className="container flex flex-col py-4 gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-foreground hover:text-primary border-b border-border/50"
              >
                {item.label}
              </a>
            ))}
            <div className="flex gap-2 pt-3">
              <Button variant="outline" size="sm" className="flex-1 gap-2">
                <Heart className="h-4 w-4" /> Yêu thích
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Globe className="h-4 w-4" /> VI
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
