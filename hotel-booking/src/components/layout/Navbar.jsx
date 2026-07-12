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
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber text-ink">
            <Sparkles size={18} strokeWidth={2.4} />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight">
            Stay<span className="text-amber">Go</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.target}
              onClick={() => goToSection(link.target)}
              className="text-sm font-medium text-muted transition-colors hover:text-cloud"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/favorites"
            aria-label={`Favorites, ${count} saved`}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 text-cloud transition-colors hover:border-amber/60 hover:text-amber"
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

          <button className="hidden rounded-full bg-amber px-5 py-2 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95 sm:block">
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
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-muted hover:bg-surface hover:text-cloud"
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
