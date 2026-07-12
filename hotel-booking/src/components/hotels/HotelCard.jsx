import { memo } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Star } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext.jsx";
import { formatPrice, ratingLabel, cx } from "../../lib/format.js";
import { getReviewCount } from "../../lib/hotelExtras.js";

function HotelCard({ hotel, onOpen }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(hotel.id);
  const reviews = getReviewCount(hotel.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-amber/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={hotel.thumbnail}
          alt={hotel.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-70" />

        {/* Favorite toggle */}
        <button
          onClick={() => toggleFavorite(hotel)}
          aria-label={saved ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={saved}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-ink/60 text-cloud backdrop-blur-md transition-transform hover:scale-110 active:scale-90"
        >
          <Heart
            size={18}
            className={cx(
              "transition-colors",
              saved ? "fill-amber text-amber" : "text-cloud"
            )}
          />
        </button>

        {/* Rating chip */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/60 px-2.5 py-1 text-xs font-semibold backdrop-blur-md">
          <Star size={13} className="fill-amber text-amber" />
          {hotel.rating.toFixed(1)}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <MapPin size={13} className="text-amber" />
          {hotel.location}
        </div>

        <h3 className="mt-1.5 line-clamp-1 font-display text-lg font-semibold">
          {hotel.name}
        </h3>

        <p className="mt-1 text-xs text-muted">
          <span className="text-cloud">{ratingLabel(hotel.rating)}</span> ·{" "}
          {reviews} reviews
        </p>

        <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
          <div>
            <span className="font-display text-xl font-bold text-cloud">
              {formatPrice(hotel.price)}
            </span>
            <span className="text-xs text-muted"> / night</span>
          </div>
          <button
            onClick={() => onOpen(hotel)}
            className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-cloud transition-colors hover:border-amber hover:bg-amber hover:text-ink"
          >
            View details
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default memo(HotelCard);
