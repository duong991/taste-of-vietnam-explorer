interface Option {
  value: string;
  label: string;
}

interface SortDropdownProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  label?: string;
}

const SortDropdown = ({ value, options, onChange, label = "Sắp xếp" }: SortDropdownProps) => (
  <div className="flex items-center gap-2">
    <span className="text-sm text-muted-foreground whitespace-nowrap">{label}:</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className="h-9 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default SortDropdown;
