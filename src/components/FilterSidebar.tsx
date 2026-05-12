import { X } from "lucide-react";
import type { Region } from "@/types/content";

const REGIONS: { value: Region; label: string }[] = [
  { value: "bac", label: "Miền Bắc" },
  { value: "trung", label: "Miền Trung" },
  { value: "nam", label: "Miền Nam" },
];

const DISH_TYPES = [
  { value: "savory", label: "Mặn" },
  { value: "vegetarian", label: "Chay" },
  { value: "street", label: "Đường phố" },
  { value: "fine-dining", label: "Cao cấp" },
];

const DISH_TASTES = [
  { value: "spicy", label: "Cay" },
  { value: "sweet", label: "Ngọt" },
  { value: "sour", label: "Chua" },
  { value: "salty", label: "Mặn" },
  { value: "umami", label: "Đậm đà" },
];

const TOUR_THEMES = [
  { value: "street-food", label: "Ẩm thực đường phố" },
  { value: "fine-dining", label: "Nhà hàng cao cấp" },
  { value: "cooking-class", label: "Lớp nấu ăn" },
  { value: "market", label: "Chợ truyền thống" },
  { value: "culture", label: "Văn hoá" },
  { value: "walking", label: "Đi bộ" },
  { value: "motorbike", label: "Xe máy" },
  { value: "river-food", label: "Sông nước" },
];

interface CheckboxGroupProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (values: string[]) => void;
}

const CheckboxGroup = ({ label, options, selected, onChange }: CheckboxGroupProps) => {
  const toggle = (val: string) => {
    onChange(
      selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val],
    );
  };

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
        {label}
      </p>
      <div className="space-y-2">
        {options.map(({ value, label: optLabel }) => (
          <label key={value} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => toggle(value)}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
            />
            <span className="text-sm text-foreground group-hover:text-primary transition-smooth">
              {optLabel}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export interface DishFilters {
  regions: Region[];
  types: string[];
  tastes: string[];
}

export interface TourFilters {
  themes: string[];
  durationMax?: number;
}

interface DishFilterSidebarProps {
  mode: "dish";
  filters: DishFilters;
  onChange: (filters: DishFilters) => void;
  onReset: () => void;
  cityOptions?: { value: string; label: string }[];
  citySlug?: string;
  onCityChange?: (slug: string) => void;
}

interface TourFilterSidebarProps {
  mode: "tour";
  filters: TourFilters;
  onChange: (filters: TourFilters) => void;
  onReset: () => void;
  cityOptions?: { value: string; label: string }[];
  citySlug?: string;
  onCityChange?: (slug: string) => void;
}

type FilterSidebarProps = DishFilterSidebarProps | TourFilterSidebarProps;

const FilterSidebar = (props: FilterSidebarProps) => {
  const hasActive =
    props.mode === "dish"
      ? props.filters.regions.length > 0 || props.filters.types.length > 0 || props.filters.tastes.length > 0
      : props.filters.themes.length > 0;

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-foreground">Bộ lọc</h3>
        {hasActive && (
          <button
            onClick={props.onReset}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-smooth"
          >
            <X className="h-3.5 w-3.5" />
            Xoá tất cả
          </button>
        )}
      </div>

      {props.cityOptions && props.cityOptions.length > 0 && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
            Thành phố
          </p>
          <select
            value={props.citySlug ?? ""}
            onChange={(e) => props.onCityChange?.(e.target.value)}
            className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Tất cả thành phố</option>
            {props.cityOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {props.mode === "dish" && (
        <>
          <CheckboxGroup
            label="Vùng miền"
            options={REGIONS}
            selected={props.filters.regions}
            onChange={(v) => props.onChange({ ...props.filters, regions: v as Region[] })}
          />
          <CheckboxGroup
            label="Loại món"
            options={DISH_TYPES}
            selected={props.filters.types}
            onChange={(v) => props.onChange({ ...props.filters, types: v })}
          />
          <CheckboxGroup
            label="Khẩu vị"
            options={DISH_TASTES}
            selected={props.filters.tastes}
            onChange={(v) => props.onChange({ ...props.filters, tastes: v })}
          />
        </>
      )}

      {props.mode === "tour" && (
        <>
          <CheckboxGroup
            label="Chủ đề"
            options={TOUR_THEMES}
            selected={props.filters.themes}
            onChange={(v) => props.onChange({ ...props.filters, themes: v })}
          />
        </>
      )}
    </aside>
  );
};

export default FilterSidebar;
