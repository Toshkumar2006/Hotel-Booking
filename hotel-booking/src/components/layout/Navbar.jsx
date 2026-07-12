import { motion } from "framer-motion";
import { Menu, X, Hotel } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    "Home",
    "Rooms",
    "Suites",
    "Amenities",
    "Gallery",
    "Contact",
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-2xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        {/* Logo */}

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <Hotel className="text-yellow-500 w-8 h-8" />

          <div>
            <h1 className="text-2xl font-bold tracking-widest text-white">
              Stay
            </h1>

            <p className="text-yellow-500 text-xs tracking-[4px]">
              GO
            </p>
          </div>
        </motion.div>

        {/* Desktop */}

        <ul className="hidden lg:flex gap-10 text-white">

          {navLinks.map((item) => (
            <motion.li
              key={item}
              whileHover={{ y: -3 }}
              className="relative cursor-pointer group"
            >
              <span className="transition text-gray-300 group-hover:text-yellow-400">
                {item}
              </span>

              <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </motion.li>
          ))}

        </ul>

        {/* Book Button */}

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="hidden lg:block px-6 py-3 rounded-full bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
        >
          Book Now
        </motion.button>

        {/* Mobile */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-[#111111] border-t border-yellow-600/20"
        >
          {navLinks.map((item) => (
            <div
              key={item}
              className="px-8 py-4 text-gray-300 border-b border-gray-800 hover:text-yellow-400 cursor-pointer"
            >
              {item}
            </div>
          ))}

          <div className="p-6">
            <button className="w-full bg-yellow-500 text-black py-3 rounded-full font-semibold">
              Book Now
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}