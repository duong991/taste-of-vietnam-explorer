interface Props {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}

const SectionHeader = ({ eyebrow, title, action }: Props) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground max-w-2xl">
        {title}
      </h2>
    </div>
    {action}
  </div>
);

export default SectionHeader;
