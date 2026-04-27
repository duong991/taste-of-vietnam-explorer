import { useId } from "react";

export interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  step?: number;
  onChange: (value: [number, number]) => void;
  formatLabel?: (value: number) => string;
}

const defaultFormat = (v: number) => new Intl.NumberFormat("vi-VN").format(v) + " đ";

export function PriceRangeSlider({
  min,
  max,
  value,
  step = 50_000,
  onChange,
  formatLabel = defaultFormat,
}: PriceRangeSliderProps) {
  const minId = useId();
  const maxId = useId();

  const [lo, hi] = value;

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.min(Number(e.target.value), hi - step);
    onChange([next, hi]);
  };

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Math.max(Number(e.target.value), lo + step);
    onChange([lo, next]);
  };

  const loPercent = ((lo - min) / (max - min)) * 100;
  const hiPercent = ((hi - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="relative h-5 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-muted" />
        <div
          className="absolute h-1.5 rounded-full bg-primary"
          style={{ left: `${loPercent}%`, width: `${hiPercent - loPercent}%` }}
        />

        <input
          id={minId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={handleMin}
          aria-label="Giá tối thiểu"
          className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer price-range-thumb"
        />
        <input
          id={maxId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={handleMax}
          aria-label="Giá tối đa"
          className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer price-range-thumb"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{formatLabel(lo)}</span>
        <span className="text-muted-foreground">—</span>
        <span className="font-medium text-foreground">{formatLabel(hi)}</span>
      </div>
    </div>
  );
}
