interface TechLabelProps {
  text: string;
  className?: string;
}

const TechLabel = ({ text, className = "" }: TechLabelProps) => (
  <span
    className={`font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground border border-border px-2 py-0.5 select-none ${className}`}
  >
    {text}
  </span>
);

export default TechLabel;
