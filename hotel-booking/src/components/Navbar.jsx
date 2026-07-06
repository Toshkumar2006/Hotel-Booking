import { Link } from "react-router-dom";
import { FaHotel } from "react-icons/fa";


function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600"
        >
          <FaHotel className="text-3xl" />
          StayFinder
        </Link>

        <div className="flex gap-8 font-medium">
          <Link className="hover:text-blue-600" to="/">
            Home
          </Link>

          <a href="#hotels" className="hover:text-blue-600">
            Hotels
          </a>

          <a href="#footer" className="hover:text-blue-600">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
