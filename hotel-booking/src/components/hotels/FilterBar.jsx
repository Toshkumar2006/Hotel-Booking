import { Search, SlidersHorizontal, X } from "lucide-react";
import { cx } from "../../lib/format.js";

const SORTS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top rated" },
];

export default function FilterBar({
  query,
  onQuery,
  city,
  onCity,
  cities,
  sort,
  onSort,
  minRating,
  onMinRating,
  onReset,
  resultCount,
}) {
  const hasFilters =
    query || city !== "all" || sort !== "recommended" || minRating > 0;

  return (
    <div className="sticky top-16 z-30 -mx-5 mb-8 border-y border-line bg-ink/85 px-5 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="flex flex-1 items-center gap-2 rounded-full border border-line bg-surface px-4 focus-within:border-amber/60">
          <Search size={17} className="shrink-0 text-muted" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search hotels or cities..."
            className="w-full bg-transparent py-2.5 text-sm text-cloud outline-none placeholder:text-muted"
          />
          {query && (
            <button onClick={() => onQuery("")} aria-label="Clear search">
              <X size={16} className="text-muted hover:text-cloud" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select value={city} onChange={onCity} aria-label="Filter by city">
            <option value="all">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>

          <Select value={sort} onChange={onSort} aria-label="Sort hotels">
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Select>

          {/* Rating pills */}
          <div className="flex items-center gap-1 rounded-full border border-line bg-surface p-1">
            {[0, 3, 4, 4.5].map((r) => (
              <button
                key={r}
                onClick={() => onMinRating(r)}
                className={cx(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  minRating === r
                    ? "bg-amber text-ink"
                    : "text-muted hover:text-cloud"
                )}
              >
                {r === 0 ? "Any" : `${r}+`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <SlidersHorizontal size={13} className="text-amber" />
          <strong className="text-cloud">{resultCount}</strong> stays found
        </span>
        {hasFilters && (
          <button
            onClick={onReset}
            className="font-medium text-amber hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
}

function Select({ children, ...props }) {
  return (
    <select
      {...props}
      onChange={(e) => props.onChange(e.target.value)}
      className="cursor-pointer rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-cloud outline-none transition-colors hover:border-amber/60 focus:border-amber/60"
    >
      {children}
    </select>
  );
}
