interface FilterChipProps {
  value: string;
  selected: boolean;
  onClick: () => void;
}

export function FilterChip({
  value,
  selected,
  onClick,
}: FilterChipProps) {
  return (
    <button
      type="button"
      className={
        selected
          ? "filter-chip selected"
          : "filter-chip"
      }
      onClick={onClick}
      aria-pressed={selected}
    >
      {value}
    </button>
  );
}