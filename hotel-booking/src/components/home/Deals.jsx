import { motion } from "framer-motion";
import { Percent, CalendarClock, Gift } from "lucide-react";

const DEALS = [
  {
    icon: Percent,
    tag: "Save 25%",
    title: "Early bird escapes",
    copy: "Book 30 days ahead and unlock a quarter off select luxury stays.",
  },
  {
    icon: CalendarClock,
    tag: "Last minute",
    title: "Tonight's best rates",
    copy: "Spontaneous plans? Grab deeply discounted rooms for same-day check-in.",
  },
  {
    icon: Gift,
    tag: "Members only",
    title: "Stay 3, pay for 2",
    copy: "Longer getaways reward you — every third night is on the house.",
  },
];

export default function Deals() {
  return (
    <section id="deals" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 sm:px-8">
      <div className="overflow-hidden rounded-3xl border border-line bg-surface/60 p-8 sm:p-12">
        <header className="mb-8 flex flex-col gap-2">
          <span className="text-sm font-semibold uppercase tracking-widest text-amber">
            Deals & offers
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Perks worth packing for
          </h2>
        </header>

        <div className="grid gap-5 md:grid-cols-3">
          {DEALS.map((deal, i) => (
            <motion.div
              key={deal.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-line bg-ink/50 p-6 transition-colors hover:border-amber/40"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber/10 text-amber transition-colors group-hover:bg-amber group-hover:text-ink">
                  <deal.icon size={20} />
                </span>
                <span className="rounded-full border border-amber/40 px-3 py-1 text-xs font-semibold text-amber">
                  {deal.tag}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold">{deal.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{deal.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
