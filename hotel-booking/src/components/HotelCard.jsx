import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

function HotelCard({ hotel }) {

  const image = hotel.thumbnail;
  return (
   <img
src={hotel.thumbnail}
alt={hotel.name}
className="h-60 w-full object-cover hover:scale-110 duration-500"
/>

      <img
        src={image}
        alt={hotel.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {hotel.name}
        </h2>

        <div className="flex items-center gap-2 mt-3 text-gray-600">

          <FaMapMarkerAlt className="text-red-500"/>

          <span>
            {hotel.location}
          </span>

        </div>

        <div className="flex justify-between items-center mt-4">

          <div className="flex items-center gap-1">

            <FaStar className="text-yellow-500"/>

            {hotel.rating || "4.5"}

          </div>

          <div className="font-bold text-blue-600">

            ₹{parseFloat(hotel.price).toLocaleString()}

          </div>

        </div>

        <Link
          to={`/hotel/${hotel.id}`}
          className="block mt-5 text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default HotelCard;
