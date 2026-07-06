import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HotelCard from "../components/HotelCard";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Footer from "../components/Footer";

import api from "../services/api";

function Home() {

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("");

  useEffect(() => {
  const getHotels = async () => {
    try {
      const res = await api.get("/hotels/");

      setHotels(res.data.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  getHotels();
}, []);
  

  const filteredHotels = useMemo(() => {

    let list = hotels.filter((hotel) => {

      const text =
       `${hotel.name} ${hotel.location}`.toLowerCase();
      
      return text.includes(search.toLowerCase());

    });

    switch (sort) {

     case "priceLow":
  list.sort(
    (a, b) =>
      parseFloat(a.price) -
      parseFloat(b.price)
  );
  break;

case "priceHigh":
  list.sort(
    (a, b) =>
      parseFloat(b.price) -
      parseFloat(a.price)
  );
  break;

   case "rating":
  list.sort(
    (a, b) =>
      b.rating - a.rating
  );
  break;

      case "name":
        list.sort((a, b) =>
          (a.name || "").localeCompare(b.name || "")
        );
        break;

      default:
        break;
    }

    return list.slice(0, 30);

  }, [hotels, search, sort]);

  return (
    <>
      <Navbar />

      <Hero />

      <section
        id="hotels"
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <FilterBar
          sort={sort}
          setSort={setSort}
        />

        {loading ? (
          <Loader />
        ) : (
          <>
            <p className="mb-6 text-gray-600">
              {filteredHotels.length} Hotels Found
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

              {filteredHotels.slice(0, 30).map((hotel) => (
  <HotelCard
    key={hotel.id}
    hotel={hotel}
  />
))}

            </div>
          </>
        )}
      </section>

      <Footer />

    </>
  );
}

export default Home;
