import type { Region } from "@/types/content";

const REGIONS: { key: Region | "all"; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "bac", label: "Miền Bắc" },
  { key: "trung", label: "Miền Trung" },
  { key: "nam", label: "Miền Nam" },
];

interface RegionFilterProps {
  value: Region | "all";
  onChange: (region: Region | "all") => void;
}

const RegionFilter = ({ value, onChange }: RegionFilterProps) => (
  <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc theo vùng miền">
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

export default RegionFilter;
