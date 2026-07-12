import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Simple, keyboard-free image gallery: one big frame plus a thumbnail rail.
export default function Gallery({ photos = [], name }) {
  const images = photos.length ? photos : [];
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);

  if (!images.length) {
    return (
      <div className="grid aspect-[16/10] w-full place-items-center rounded-2xl bg-surface-2 text-sm text-muted">
        No photos available
      </div>
    );
  }

  const go = (next) => {
    setDir(next > index ? 1 : -1);
    setIndex((next + images.length) % images.length);
  };

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-2">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={index}
            src={images[index]}
            alt={`${name} photo ${index + 1}`}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <NavButton side="left" onClick={() => go(index - 1)} />
            <NavButton side="right" onClick={() => go(index + 1)} />
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-5 bg-amber" : "w-1.5 bg-cloud/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === index ? "border-amber" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function NavButton({ side, onClick }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={`absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink/60 text-cloud backdrop-blur-md transition-colors hover:bg-amber hover:text-ink ${
        side === "left" ? "left-3" : "right-3"
      }`}
    >
      <Icon size={20} />
    </button>
  );
}
