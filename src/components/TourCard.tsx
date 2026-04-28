import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

interface Props {
  image: string;
  name: string;
  city: string;
  duration: string;
  price: string;
  rating?: number;
  reviews?: number;
  slug?: string;
  className?: string;
}

const TourCard = ({ image, name, city, duration, price, rating, reviews, slug, className }: Props) => {
  const { t, path } = useLocale();
  return (
  <Link
    to={slug ? path.tour(slug) : path.tourList}
    className={cn(
      "group shrink-0 snap-start w-[280px] md:w-[300px] rounded-2xl bg-card overflow-hidden shadow-soft hover:shadow-card transition-smooth",
      className
    )}
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700"
      />
      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/95 backdrop-blur text-xs font-semibold text-foreground shadow-soft">
        {duration}
      </span>
    </div>
    <div className="p-5">
      <h3 className="font-display text-lg font-semibold text-foreground leading-snug mb-2 line-clamp-2">
        {name}
      </h3>
      <p className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
        <MapPin className="h-3.5 w-3.5" /> {city}
      </p>
      <div className="flex items-end justify-between pt-3 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">{t("common.from")}</p>
          <p className="font-display text-lg font-bold text-primary">{price}</p>
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          {rating} <span className="text-muted-foreground">({reviews})</span>
        </span>
      </div>
    </div>
  </Link>
  );
};

export default TourCard;
