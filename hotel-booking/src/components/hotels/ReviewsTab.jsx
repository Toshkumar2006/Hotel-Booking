import { useMemo } from "react";
import { motion } from "framer-motion";
import StarRating from "../ui/StarRating.jsx";
import { ratingLabel } from "../../lib/format.js";
import { getReviews } from "../../lib/hotelExtras.js";

export default function ReviewsTab({ hotel }) {
  const reviews = useMemo(
    () => getReviews(hotel.id, hotel.rating),
    [hotel.id, hotel.rating]
  );

  // Bucket the star counts so we can draw the little distribution bars.
  const distribution = useMemo(() => {
    const buckets = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => (buckets[r.stars] += 1));
    return buckets;
  }, [reviews]);

  return (
    <div className="grid gap-8 md:grid-cols-[240px_1fr]">
      {/* Summary rail */}
      <div className="rounded-2xl border border-line bg-ink/40 p-5">
        <div className="text-center">
          <div className="font-display text-5xl font-extrabold text-amber">
            {hotel.rating.toFixed(1)}
          </div>
          <StarRating value={hotel.rating} size={16} className="mt-2 justify-center" />
          <p className="mt-2 text-sm font-medium">{ratingLabel(hotel.rating)}</p>
          <p className="text-xs text-muted">{reviews.length} verified reviews</p>
        </div>

        <div className="mt-5 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const pct = reviews.length
              ? (distribution[star] / reviews.length) * 100
              : 0;
            return (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-muted">{star}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-full rounded-full bg-amber"
                  />
                </div>
                <span className="w-4 text-right text-muted">{distribution[star]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-4">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-line bg-ink/40 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-amber/15 font-display text-sm font-bold text-amber">
                  {review.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold">{review.name}</p>
                  <p className="text-xs text-muted">{review.date}</p>
                </div>
              </div>
              <StarRating value={review.stars} size={13} />
            </div>
            <h4 className="mt-4 font-display text-sm font-semibold">{review.headline}</h4>
            <p className="mt-1 text-sm leading-relaxed text-muted">{review.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
