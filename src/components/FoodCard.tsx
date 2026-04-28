import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";
import { LazyImage } from "@/components/ui/lazy-image";

interface Props {
  image: string;
  name: string;
  city: string;
  rating?: number;
  michelin?: boolean;
  slug?: string;
  className?: string;
}

const FoodCard = ({ image, name, city, rating, michelin, slug, className }: Props) => {
  const { path } = useLocale();
  return (
  <Link
    to={slug ? path.dish(slug) : path.dishList}
    className={cn(
      "group shrink-0 snap-start w-[220px] md:w-[240px] rounded-2xl bg-card overflow-hidden shadow-soft hover:shadow-card transition-smooth",
      className
    )}
  >
    <div className="relative aspect-square overflow-hidden">
      <LazyImage
        src={image}
        alt={name}
        loading="lazy"
        className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700"
      />
      {michelin && (
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-michelin text-michelin-foreground text-[10px] font-bold tracking-wide shadow-soft">
          <span className="inline-block h-2 w-2 rounded-full bg-michelin-foreground/80" />
          MICHELIN 2024
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-display text-lg font-semibold text-foreground mb-1 truncate">
        {name}
      </h3>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{city}</span>
        <span className="flex items-center gap-1 text-foreground font-medium">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          {rating}
        </span>
      </div>
    </div>
  </Link>
  );
};

export default FoodCard;
