import { ReactNode, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Carousel = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <div className="relative -mx-4 md:mx-0">
      <div
        ref={ref}
        className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 md:px-0 pb-2"
      >
        {children}
      </div>
      <button
        onClick={() => scroll(-1)}
        aria-label="Trước"
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background shadow-card items-center justify-center text-foreground hover:text-primary transition-smooth z-10"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scroll(1)}
        aria-label="Tiếp"
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background shadow-card items-center justify-center text-foreground hover:text-primary transition-smooth z-10"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Carousel;
