import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Builds destination tiles straight from the live data: one representative
// photo per city plus a live count. Clicking a tile searches that city.
export default function Destinations({ hotels, onSelectCity }) {
  const cities = useMemo(() => {
    const map = new Map();
    for (const h of hotels) {
      if (!map.has(h.location)) {
        map.set(h.location, { name: h.location, count: 0, image: h.thumbnail });
      }
      map.get(h.location).count += 1;
    }
    return [...map.values()].sort((a, b) => b.count - a.count).slice(0, 8);
  }, [hotels]);

  if (!cities.length) return null;

  return (
    <section id="destinations" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold uppercase tracking-widest text-amber">
            Destinations
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Popular places to stay
          </h2>
        </div>
        <p className="max-w-sm text-sm text-muted">
          Explore the cities travellers love most, from coastal Goa to buzzing
          Bengaluru.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {cities.map((city, i) => (
          <motion.button
            key={city.name}
            onClick={() => onSelectCity(city.name)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-line text-left"
          >
            <img
              src={city.image}
              alt={city.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-display text-lg font-bold">{city.name}</p>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                {city.count} stays
                <ArrowRight
                  size={13}
                  className="text-amber transition-transform group-hover:translate-x-1"
                />
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
