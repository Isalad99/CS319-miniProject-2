interface Props {
  value: number;
  className?: string;
}

export default function RatingDisplay({ value, className = "" }: Props) {
  return (
    <span
      role="img"
      aria-label={`ให้ ${value} จาก 5 ดาว`}
      className={`inline-flex gap-0.5 text-sm leading-none ${className}`}
    >
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          aria-hidden="true"
          className={s <= value ? "text-warning" : "text-base-content/20"}
        >
          ★
        </span>
      ))}
    </span>
  );
}
