import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Users, Check } from "lucide-react";
import { formatPrice, cx } from "../../lib/format.js";
import { getAvailability, getRoomTypes } from "../../lib/hotelExtras.js";

export default function AvailabilityTab({ hotel }) {
  const days = useMemo(
    () => getAvailability(hotel.id, hotel.price),
    [hotel.id, hotel.price]
  );
  const rooms = useMemo(() => getRoomTypes(hotel.price), [hotel.price]);

  const firstOpen = days.find((d) => !d.soldOut)?.key ?? null;
  const [selected, setSelected] = useState(firstOpen);
  const [room, setRoom] = useState(0);

  const selectedDay = days.find((d) => d.key === selected);

  return (
    <div className="space-y-8">
      <div>
        <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted">
          Next 14 nights
        </h4>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
          {days.map((day) => {
            const active = day.key === selected;
            return (
              <button
                key={day.key}
                disabled={day.soldOut}
                onClick={() => setSelected(day.key)}
                className={cx(
                  "flex min-w-[74px] flex-col items-center gap-0.5 rounded-xl border px-3 py-3 text-center transition-colors",
                  day.soldOut && "cursor-not-allowed border-line/50 opacity-40",
                  active
                    ? "border-amber bg-amber/10"
                    : "border-line hover:border-amber/50"
                )}
              >
                <span className="text-[11px] uppercase text-muted">{day.label}</span>
                <span className="font-display text-lg font-bold leading-none">
                  {day.day}
                </span>
                <span className="text-[11px] text-muted">{day.month}</span>
                <span
                  className={cx(
                    "mt-1 text-[11px] font-semibold",
                    day.soldOut ? "text-muted" : "text-amber"
                  )}
                >
                  {day.soldOut ? "Sold out" : `₹${(day.price / 1000).toFixed(1)}k`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted">
          Choose a room
        </h4>
        <div className="space-y-3">
          {rooms.map((r, i) => {
            const active = i === room;
            return (
              <button
                key={r.name}
                onClick={() => setRoom(i)}
                className={cx(
                  "flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-colors",
                  active ? "border-amber bg-amber/5" : "border-line hover:border-amber/40"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cx(
                      "grid h-6 w-6 place-items-center rounded-full border",
                      active ? "border-amber bg-amber text-ink" : "border-line"
                    )}
                  >
                    {active && <Check size={14} />}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="flex items-center gap-1 text-xs text-muted">
                      <Users size={12} /> Sleeps {r.guests}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold">{formatPrice(r.price)}</p>
                  <p className="text-xs text-muted">/ night</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Booking summary */}
      <motion.div
        layout
        className="flex flex-col gap-4 rounded-2xl border border-line bg-ink/50 p-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="text-xs text-muted">
            {selectedDay
              ? `${selectedDay.label}, ${selectedDay.day} ${selectedDay.month} · ${rooms[room].name}`
              : "Select an available night"}
          </p>
          <p className="font-display text-2xl font-bold">
            {formatPrice(rooms[room].price)}
            <span className="text-sm font-normal text-muted"> / night</span>
          </p>
        </div>
        <button
          disabled={!selectedDay}
          className="rounded-full bg-amber px-7 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-40"
        >
          Reserve now
        </button>
      </motion.div>
    </div>
  );
}
