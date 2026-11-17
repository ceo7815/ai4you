export function AccentText({ value, className = "" }: { value: string; className?: string }) {
  const parts = value.split(/<accent>|<\/accent>/);
  if (parts.length !== 3) return <span className={className}>{value}</span>;
  return (
    <span className={className}>
      {parts[0]}
      <span className="r-accent">{parts[1]}</span>
      {parts[2]}
    </span>
  );
}
