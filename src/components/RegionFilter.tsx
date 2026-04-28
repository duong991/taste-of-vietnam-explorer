import type { Region } from "@/types/content";
import { useLocale } from "@/hooks/useLocale";

const REGION_KEYS: (Region | "all")[] = ["all", "bac", "trung", "nam"];

interface RegionFilterProps {
  value: Region | "all";
  onChange: (region: Region | "all") => void;
}

const RegionFilter = ({ value, onChange }: RegionFilterProps) => {
  const { t } = useLocale();

  const REGIONS = REGION_KEYS.map((key) => ({
    key,
    label: t(`region.${key}`),
  }));

  return (
  <div className="flex flex-wrap gap-2" role="group" aria-label={t("city_list.breadcrumb")}>
    {REGIONS.map((r) => (
      <button
        key={r.key}
        onClick={() => onChange(r.key)}
        aria-pressed={value === r.key}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
          value === r.key
            ? "bg-primary text-primary-foreground shadow-soft"
            : "bg-secondary text-foreground hover:bg-muted"
        }`}
      >
        {r.label}
      </button>
    ))}
  </div>
  );
};

export default RegionFilter;
