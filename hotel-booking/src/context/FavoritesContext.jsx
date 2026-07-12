import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Favorites live in localStorage — the demo API is read-only, so this is the
// most honest way to persist a user's shortlist between visits.

const STORAGE_KEY = "staygo:favorites";
const FavoritesContext = createContext(null);

function readInitial() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore quota / privacy-mode errors — favorites just won't persist.
    }
  }, [favorites]);

  const value = useMemo(() => {
    const ids = new Set(favorites.map((h) => h.id));

    return {
      favorites,
      count: favorites.length,
      isFavorite: (id) => ids.has(id),
      toggleFavorite: (hotel) =>
        setFavorites((prev) =>
          prev.some((h) => h.id === hotel.id)
            ? prev.filter((h) => h.id !== hotel.id)
            : [
                {
                  id: hotel.id,
                  name: hotel.name,
                  price: hotel.price,
                  rating: hotel.rating,
                  location: hotel.location,
                  thumbnail: hotel.thumbnail,
                },
                ...prev,
              ]
        ),
      clear: () => setFavorites([]),
    };
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used inside a FavoritesProvider");
  }
  return ctx;
}
