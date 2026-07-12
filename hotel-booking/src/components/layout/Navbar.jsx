import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X, Sparkles } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext.jsx";
import { cx } from "../../lib/format.js";

const LINKS = [
  { label: "Explore Hotels", target: "explore" },
  { label: "Destinations", target: "destinations" },
  { label: "Deals & Offers", target: "deals" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useFavorites();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // If we're not on the home page, jump home first, then scroll to the section.
  const goToSection = (target) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: target } });
      return;
    }
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-line/70 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
  className={cx(
    "mx-auto mt-4 flex h-18 max-w-7xl items-center justify-between rounded-3xl border px-6 sm:px-8 transition-all duration-300",
    scrolled
      ? "border-white/10 bg-white/10 shadow-2xl backdrop-blur-2xl"
      : "border-white/10 bg-black/20 backdrop-blur-xl"
  )}
>
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 text-white shadow-lg">
            <Sparkles size={18} strokeWidth={2.4} />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">
           Stay<span className="text-sky-400">Go</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.target}
              onClick={() => goToSection(link.target)}
              className="text-sm font-medium text-muted transition-all duration-300 hover:text-white hover:scale-105"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/favorites"
            aria-label={`Favorites, ${count} saved`}
            className="relative grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:border-sky-400"
          >
            <Heart size={18} className={count ? "fill-amber text-amber" : ""} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-amber px-1 text-[11px] font-bold text-ink"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button className="hidden rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-sky-500/30 active:scale-95 sm:block">
            Sign In
          </button>

          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-cloud md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {LINKS.map((link) => (
                <button
                  key={link.target}
                  onClick={() => goToSection(link.target)}
                  className="rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </button>
              ))}
              <button className="mt-2 rounded-full bg-amber px-5 py-3 text-sm font-semibold text-ink">
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
