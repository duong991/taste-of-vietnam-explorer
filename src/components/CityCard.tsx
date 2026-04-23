import { MapPin } from "lucide-react";

interface Props {
  image: string;
  name: string;
  tagline: string;
}

const CityCard = ({ image, name, tagline }: Props) => (
  <a
    href="#"
    className="group relative shrink-0 snap-start w-[260px] md:w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-smooth"
  >
    <img
      src={image}
      alt={name}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-smooth duration-700"
    />
    <div className="absolute inset-0 gradient-card-overlay" />
    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
      <h3 className="font-display text-2xl font-semibold mb-1">{name}</h3>
      <p className="flex items-center gap-1.5 text-xs text-white/85">
        <MapPin className="h-3.5 w-3.5" />
        {tagline}
      </p>
    </div>
  </a>
);

export default CityCard;
