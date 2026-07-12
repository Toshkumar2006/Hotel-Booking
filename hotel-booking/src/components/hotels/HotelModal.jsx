import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, Heart, MapPin, Star, Wifi, Waves, Sparkles, Dumbbell,
  UtensilsCrossed, Car, Wine, Snowflake, Coffee, Dog, Check,
} from "lucide-react";
import Gallery from "./Gallery.jsx";
import ReviewsTab from "./ReviewsTab.jsx";
import AvailabilityTab from "./AvailabilityTab.jsx";
import StarRating from "../ui/StarRating.jsx";
import { useFavorites } from "../../context/FavoritesContext.jsx";
import { formatPrice, ratingLabel, cx } from "../../lib/format.js";
import { getAmenities } from "../../lib/hotelExtras.js";

const AMENITY_ICONS = {
  wifi: Wifi, pool: Waves, spa: Sparkles, gym: Dumbbell,
  restaurant: UtensilsCrossed, parking: Car, bar: Wine,
  ac: Snowflake, breakfast: Coffee, pet: Dog,
};

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "reviews", label: "Reviews" },
  { id: "availability", label: "Availability" },
];

export default function HotelModal({ hotel, onClose }) {
  const [tab, setTab] = useState("overview");
  const { isFavorite, toggleFavorite } = useFavorites();

  // Reset to the first tab whenever a different hotel is opened.
  useEffect(() => {
    setTab("overview");
  }, [hotel?.id]);

  // Lock body scroll + close on Escape while the modal is open.
  useEffect(() => {
    if (!hotel) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [hotel, onClose]);

  const saved = hotel ? isFavorite(hotel.id) : false;

  return (
    <AnimatePresence>
      {hotel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/80 p-4 backdrop-blur-sm sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-line bg-surface"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-surface/95 p-5 backdrop-blur-xl sm:px-8">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <MapPin size={13} className="text-amber" />
                  {hotel.location}
                </div>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
                  {hotel.name}
                </h2>
                <div className="mt-1.5 flex items-center gap-2 text-sm">
                  <span className="flex items-center gap-1 rounded-full bg-amber/15 px-2 py-0.5 font-semibold text-amber">
                    <Star size={12} className="fill-amber" />
                    {hotel.rating.toFixed(1)}
                  </span>
                  <span className="text-muted">{ratingLabel(hotel.rating)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(hotel)}
                  aria-label={saved ? "Remove from favorites" : "Add to favorites"}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-cloud transition-colors hover:border-amber/60"
                >
                  <Heart size={18} className={saved ? "fill-amber text-amber" : ""} />
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-cloud transition-colors hover:border-amber/60"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              <Gallery photos={hotel.photos} name={hotel.name} />

              {/* Tabs */}
              <div className="mt-6 flex gap-1 rounded-full border border-line bg-ink/40 p-1">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={cx(
                      "relative flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
                      tab === t.id ? "text-ink" : "text-muted hover:text-cloud"
                    )}
                  >
                    {tab === t.id && (
                      <motion.span
                        layoutId="tab-pill"
                        className="absolute inset-0 rounded-full bg-amber"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">{t.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                  >
                    {tab === "overview" && <Overview hotel={hotel} />}
                    {tab === "reviews" && <ReviewsTab hotel={hotel} />}
                    {tab === "availability" && <AvailabilityTab hotel={hotel} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Overview({ hotel }) {
  const amenities = getAmenities(hotel.id);

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_260px]">
      <div>
        <h3 className="font-display text-lg font-semibold">About this stay</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{hotel.description}</p>

        <h3 className="mt-8 font-display text-lg font-semibold">
          What this place offers
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {amenities.map((a) => {
            const Icon = AMENITY_ICONS[a.key] ?? Check;
            return (
              <div
                key={a.key}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-ink/40 px-3 py-2.5 text-sm"
              >
                <Icon size={16} className="shrink-0 text-amber" />
                {a.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Price card */}
      <aside className="h-fit rounded-2xl border border-line bg-ink/50 p-5">
        <p className="text-xs uppercase tracking-wider text-muted">Starting from</p>
        <p className="mt-1 font-display text-3xl font-extrabold">
          {formatPrice(hotel.price)}
          <span className="text-sm font-normal text-muted"> / night</span>
        </p>
        <StarRating value={hotel.rating} size={15} className="mt-3" />
        <p className="mt-1 text-xs text-muted">
          {ratingLabel(hotel.rating)} · Includes taxes & fees
        </p>
        <button className="mt-5 w-full rounded-full bg-amber py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-95">
          Check availability
        </button>
        <p className="mt-3 text-center text-xs text-muted">
          Free cancellation up to 24h before check-in
        </p>
      </aside>
    </div>
  );
}
