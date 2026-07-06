import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHotel() {
      try {
        const res = await api.get("/hotels/");
        const selected = res.data.data.find(
          (item) => item.id === Number(id)
        );
        setHotel(selected);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchHotel();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-20 text-2xl">
        Loading...
      </div>
    );

  if (!hotel)
    return (
      <div className="text-center py-20">
        Hotel not found
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">

      <Link
        to="/"
        className="text-blue-600 underline"
      >
        ← Back
      </Link>

      <img
        src={hotel.thumbnail}
        alt={hotel.name}
        className="w-full h-[450px] object-cover rounded-xl mt-5"
      />

      <h1 className="text-5xl font-bold mt-8">
        {hotel.name}
      </h1>

      <p className="text-xl mt-4">
        📍 {hotel.location}
      </p>

      <p className="mt-4 text-yellow-500 text-xl">
        ⭐ {hotel.rating}
      </p>

      <p className="mt-4 text-3xl text-blue-600 font-bold">
        ₹{parseFloat(hotel.price).toLocaleString()}
      </p>

      <p className="mt-8 text-gray-700 leading-8">
        {hotel.description}
      </p>

      <button
        className="mt-10 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700"
      >
        Book Now
      </button>

     <h2 className="text-3xl font-bold mt-16 mb-6">
  Hotel Image
</h2>

<img
  src={hotel.thumbnail}
  alt={hotel.name}
  className="w-full rounded-xl"
/>
    </div>
  );
}

export default HotelDetails;
