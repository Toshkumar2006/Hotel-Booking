import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX, Loader2, RotateCcw } from "lucide-react";
import HotelCard from "./HotelCard.jsx";
import HotelCardSkeleton from "./HotelCardSkeleton.jsx";
import FilterBar from "./FilterBar.jsx";

const PAGE_SIZE = 12;

export default function HotelExplorer({
  hotels,
  status,
  error,
  onReload,
  query,
  onQuery,
  onOpen,
}) {
  const [city, setCity] = useState("all");
  const [sort, setSort] = useState("recommended");
  const [minRating, setMinRating] = useState(0);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const cities = useMemo(
    () => [...new Set(hotels.map((h) => h.location))].sort(),
    [hotels]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = hotels.filter((h) => {
      const matchesQuery =
        !q ||
        h.name.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q);
      const matchesCity = city === "all" || h.location === city;
      const matchesRating = h.rating >= minRating;
      return matchesQuery && matchesCity && matchesRating;
    });

    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [hotels, query, city, minRating, sort]);

  // Reset pagination whenever the filter result set changes meaningfully.
  const resultKey = `${query}-${city}-${sort}-${minRating}`;
  const [lastKey, setLastKey] = useState(resultKey);
  if (resultKey !== lastKey) {
    setLastKey(resultKey);
    setVisible(PAGE_SIZE);
  }

  const reset = () => {
    onQuery("");
    setCity("all");
    setSort("recommended");
    setMinRating(0);
  };

  const shown = filtered.slice(0, visible);

  return (
    <section id="explore" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-8">
      <header className="mb-6 flex flex-col gap-2">
        <span className="text-sm font-semibold uppercase tracking-widest text-amber">
          Explore hotels
        </span>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Browse every available stay
        </h2>
      </header>

      <FilterBar
        query={query}
        onQuery={onQuery}
        city={city}
        onCity={setCity}
        cities={cities}
        sort={sort}
        onSort={setSort}
        minRating={minRating}
        onMinRating={setMinRating}
        onReset={reset}
        resultCount={filtered.length}
      />

      {status === "error" && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface py-20 text-center">
          <p className="text-muted">{error}</p>
          <button
            onClick={onReload}
            className="flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-ink"
          >
            <RotateCcw size={16} /> Try again
          </button>
        </div>
      )}

      {status === "loading" && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <HotelCardSkeleton key={i} />
          ))}
        </div>
      )}

      {status === "success" && filtered.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface py-20 text-center">
          <SearchX size={40} className="text-muted" />
          <p className="font-display text-lg font-semibold">No stays match your filters</p>
          <p className="max-w-sm text-sm text-muted">
            Try widening your search or resetting the filters to see everything.
          </p>
          <button
            onClick={reset}
            className="mt-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-cloud hover:border-amber hover:text-amber"
          >
            Reset filters
          </button>
        </div>
      )}

      {status === "success" && filtered.length > 0 && (
        <>
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {shown.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} onOpen={onOpen} />
              ))}
            </AnimatePresence>
          </motion.div>

          {visible < filtered.length && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="flex items-center gap-2 rounded-full border border-line bg-surface px-7 py-3 text-sm font-semibold text-cloud transition-colors hover:border-amber hover:text-amber"
              >
                <Loader2 size={16} className="text-amber" />
                Load more stays ({filtered.length - visible} left)
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
