import { useState, useRef, FormEvent } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchInputProps {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  onSubmit?: (value: string) => void;
}

const SearchInput = ({
  defaultValue = "",
  placeholder = "Tìm thành phố, món ăn, tour…",
  className = "",
  onSubmit,
}: SearchInputProps) => {
  const [value, setValue] = useState(defaultValue);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    if (onSubmit) {
      onSubmit(q);
    } else {
      navigate(`/tim-kiem?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 ${className}`} role="search">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Tìm kiếm"
          className="w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
      </div>
      <button
        type="submit"
        className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Tìm
      </button>
    </form>
  );
};

export default SearchInput;
