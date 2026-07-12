import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/home/Hero.jsx";
import Destinations from "../components/home/Destinations.jsx";
import Deals from "../components/home/Deals.jsx";
import HotelExplorer from "../components/hotels/HotelExplorer.jsx";

export default function Home({ hotels, status, error, reload, onOpen }) {
  const [query, setQuery] = useState("");
  const location = useLocation();

  // Navbar links from other routes ask us to scroll to a section once mounted.
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      requestAnimationFrame(() =>
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" })
      );
    }
  }, [location.state]);

  const searchCity = (city) => {
    setQuery(city);
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Hero onSearch={setQuery} totalHotels={hotels.length} />
      <Destinations hotels={hotels} onSelectCity={searchCity} />
      <Deals />
      <HotelExplorer
        hotels={hotels}
        status={status}
        error={error}
        onReload={reload}
        query={query}
        onQuery={setQuery}
        onOpen={onOpen}
      />
    </>
  );
}
