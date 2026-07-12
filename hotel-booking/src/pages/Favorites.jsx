import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HeartOff, ArrowLeft, Trash2 } from "lucide-react";
import HotelCard from "../components/hotels/HotelCard.jsx";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function Favorites({ onOpen }) {
  const { favorites, count, clear } = useFavorites();

  return (
    <section className="mx-auto min-h-[80vh] max-w-7xl px-5 pb-20 pt-28 sm:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cloud"
      >
        <ArrowLeft size={16} /> Back to all hotels
      </Link>

      <header className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Your saved stays
          </h1>
          <p className="mt-2 text-sm text-muted">
            {count > 0
              ? `${count} ${count === 1 ? "hotel" : "hotels"} shortlisted for your next trip.`
              : "Tap the heart on any hotel to start building your shortlist."}
          </p>
        </div>
        {count > 0 && (
          <button
            onClick={clear}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-red-500/50 hover:text-red-400"
          >
            <Trash2 size={15} /> Clear all
          </button>
        )}
      </header>

      {count === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl border border-line bg-surface py-24 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-surface-2">
            <HeartOff size={28} className="text-muted" />
          </span>
          <p className="font-display text-lg font-semibold">No favorites yet</p>
          <p className="max-w-sm text-sm text-muted">
            Browse our collection and save the stays you love — they'll show up
            right here.
          </p>
          <Link
            to="/"
            className="mt-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Explore hotels
          </Link>
        </div>
      ) : (
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {favorites.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} onOpen={onOpen} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
