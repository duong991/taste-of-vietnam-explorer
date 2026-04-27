import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { TourItineraryStep } from "@/types/content";

interface ItineraryProps {
  steps: TourItineraryStep[];
  locale?: "vi" | "en";
}

const Itinerary = ({ steps, locale = "vi" }: ItineraryProps) => {
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]));

  const toggle = (idx: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <ol className="relative space-y-0">
      {steps.map((step, idx) => {
        const isOpen = expanded.has(idx);
        return (
          <li key={idx} className="relative pl-8">
            <span className="absolute left-0 top-4 h-full w-px bg-border -z-0" aria-hidden />
            <span className="absolute left-[-4px] top-4 h-3 w-3 rounded-full bg-primary ring-2 ring-background z-10" aria-hidden />
            <button
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full text-left py-4 focus:outline-none group"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-semibold text-primary tabular-nums shrink-0">{step.time}</span>
                  <span className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-smooth">
                    {step.title[locale]}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-smooth shrink-0 ${isOpen ? "rotate-180" : ""}`}
                />
              </div>

              {isOpen && (
                <div className="mt-2 pr-4">
                  {step.image && (
                    <img
                      src={step.image}
                      alt={step.title[locale]}
                      loading="lazy"
                      className="w-full aspect-[16/7] object-cover rounded-lg mb-3"
                    />
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description[locale]}
                  </p>
                </div>
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
};

export default Itinerary;
