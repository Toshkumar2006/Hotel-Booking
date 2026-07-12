import { Star } from "lucide-react";
import { cx } from "../../lib/format.js";

// Renders 5 stars with partial fill via a clipped overlay. Purely presentational.
export default function StarRating({ value = 0, size = 14, className }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));

  return (
    <span
      className={cx("relative inline-flex", className)}
      role="img"
      aria-label={`${value.toFixed(1)} out of 5 stars`}
    >
      <span className="flex text-line">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={size} className="fill-current" strokeWidth={0} />
        ))}
      </span>
      <span
        className="absolute inset-0 flex overflow-hidden text-amber"
        style={{ width: `${pct}%` }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className="shrink-0 fill-current"
            strokeWidth={0}
          />
        ))}
      </span>
    </span>
  );
}
