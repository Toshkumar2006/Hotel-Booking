import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Building2 } from "lucide-react";
import heroResort from "../assets/hero-resort.png";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero({ onSearch, totalHotels }) {
  const [query, setQuery] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(query);
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
   <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Cinematic background with a slow ken-burns drift */}
      <div className="absolute inset-0">
        <img
          src="/hero-resort.png"
          alt="Luxury glass villa lit at dusk beside an infinity pool"
          className="h-full w-full object-cover scale-105 transition-transform duration-[12000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#050816]/90 via-[#050816]/65 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.18),transparent_55%)]" />
      </div>

      {/* Oversized ghost wordmark, echoing the reference design */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[22%] -translate-x-1/2 select-none font-display text-[26vw] font-extrabold leading-none tracking-tighter text-cloud/5"
      >
        StayGo
      </span>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line/80 bg-ink/40 px-4 py-1.5 text-xs font-medium text-cloud backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            {totalHotels ? `${totalHotels}+ stays across India` : "Handpicked stays across India"}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            Find Your Perfect Stay
            <span className="block text-amber">at the Best Price</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            From boutique city hideaways to beachfront resorts — browse, compare
            and shortlist thousands of hotels in seconds.
          </motion.p>

          {/* Search bar echoing the reference: pill input + amber action */}
          <motion.form
            variants={fadeUp}
            custom={3}
            onSubmit={submit}
            className="mt-8 flex max-w-xl items-center gap-2 rounded-full border border-line/80 bg-ink/70 p-2 pl-5 backdrop-blur-xl focus-within:border-amber/60"
          >
            <Search size={20} className="shrink-0 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by hotel name or city..."
              className="w-full bg-transparent py-2.5 text-sm text-cloud outline-none placeholder:text-muted"
              aria-label="Search hotels"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-amber px-6 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95"
            >
              Search
            </button>
          </motion.form>

          <motion.dl
            variants={fadeUp}
            custom={4}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-4"
          >
            {[
              { icon: Building2, value: `${totalHotels || "500"}+`, label: "Hotels listed" },
              { icon: MapPin, value: "12", label: "Cities covered" },
              { icon: Star, value: "4.8", label: "Avg. guest rating" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon size={20} className="text-amber" />
                <div>
                  <dt className="font-display text-xl font-bold leading-none">{value}</dt>
                  <dd className="mt-1 text-xs text-muted">{label}</dd>
                </div>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
