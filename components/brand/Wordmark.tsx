export function Wordmark({
  className = "",
  stacked = false,
}: {
  className?: string;
  stacked?: boolean;
}) {
  if (stacked) {
    return (
      <span
        className={`inline-flex flex-col font-display font-semibold uppercase leading-[0.82] tracking-[-0.01em] ${className}`}
      >
        <span>Finders</span>
        <span>Keepers</span>
      </span>
    );
  }

  return (
    <span className={`font-display font-semibold uppercase tracking-tight ${className}`}>
      Finders Keepers
    </span>
  );
}
