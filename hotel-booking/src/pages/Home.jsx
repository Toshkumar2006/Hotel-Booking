import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HotelCard from "../components/HotelCard";
import Loader from "../components/Loader";

import api from "../services/api";

function Home() {

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchHotels = async () => {

      try {

        const response = await api.get("/hotels/");

        setHotels(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchHotels();

  }, []);

  return (
    <>
      <Navbar />

      <Hero />

      <section
        id="hotels"
        className="max-w-7xl mx-auto px-6 py-16"
      >

        <h2 className="text-4xl font-bold mb-10">
          Popular Hotels
        </h2>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
              />
            ))}

          </div>
        )}

      </section>
    </>
  );
}

export default Home;
