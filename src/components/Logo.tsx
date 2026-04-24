const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <div className="relative h-10 w-10 shrink-0">
      <svg viewBox="0 0 40 40" className="h-full w-full text-primary" fill="none">
        <path
          d="M20 3 L25 12 L35 14 L28 22 L30 33 L20 28 L10 33 L12 22 L5 14 L15 12 Z"
          fill="currentColor"
          opacity="0.15"
        />
        <path
          d="M20 6 L24 13 L32 14.5 L26.5 21 L28 30 L20 26 L12 30 L13.5 21 L8 14.5 L16 13 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
      </svg>
    </div>
    <div className="flex flex-col leading-none">
      <span className="font-display text-base font-semibold text-primary">Dấu ấn</span>
      <span className="font-display text-xs text-muted-foreground">Hương vị Việt</span>
    </div>
  </div>
);

export default Logo;
