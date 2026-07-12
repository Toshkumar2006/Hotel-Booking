import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import HotelModal from "./components/hotels/HotelModal.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import { useHotels } from "./hooks/useHotels.js";

export default function App() {
  const { hotels, status, error, reload } = useHotels();
  const [selected, setSelected] = useState(null);
  const { pathname } = useLocation();

  // Scroll to top on route change (but keep in-page section scrolling intact).
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  // Favorites only store a lightweight snapshot, so resolve the full record
  // (photos, description) from the loaded list before opening the modal.
  const openHotel = useCallback(
    (hotel) => {
      const full = hotels.find((h) => h.id === hotel.id) || hotel;
      setSelected(full);
    },
    [hotels]
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                hotels={hotels}
                status={status}
                error={error}
                reload={reload}
                onOpen={openHotel}
              />
            }
          />
          <Route path="/favorites" element={<Favorites onOpen={openHotel} />} />
        </Routes>
      </main>

      <Footer />

      <HotelModal hotel={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
