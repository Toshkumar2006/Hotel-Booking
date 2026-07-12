import { motion } from "framer-motion";
import { Hotel, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    "Home",
    "Rooms",
    "Suites",
    "Amenities",
    "Gallery",
    "Contact",
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-2xl border-b border-yellow-500/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <Hotel className="text-yellow-400 w-9 h-9" />

          <div>
            <h1 className="text-white font-bold text-4xl leading-none">
              Stay
            </h1>

            <p className="text-yellow-400 tracking-[8px] text-sm">
              GO
            </p>
          </div>
        </motion.div>

        {/* Desktop Menu */}

        <ul className="hidden lg:flex gap-12">

          {links.map((item) => (
            <motion.li
              key={item}
              whileHover={{ y: -3 }}
              className="relative text-gray-200 cursor-pointer group"
            >
              {item}

              <span className="absolute left-0 -bottom-2 h-[2px] bg-yellow-400 w-0 group-hover:w-full transition-all duration-300"></span>
            </motion.li>
          ))}

        </ul>

        {/* Button */}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: .95 }}
          className="hidden lg:block px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-bold shadow-lg"
        >
          Book Now
        </motion.button>

        {/* Mobile */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white"
        >
          {open ? <X size={30}/> : <Menu size={30}/>}
        </button>

      </div>

      {/* Mobile Menu */}

      {open && (

        <motion.div

          initial={{opacity:0,y:-30}}

          animate={{opacity:1,y:0}}

          className="lg:hidden bg-black/80 backdrop-blur-xl"

        >

          {links.map((item)=>(

            <div

              key={item}

              className="py-5 px-8 border-b border-white/10 text-gray-300 hover:text-yellow-400"

            >

              {item}

            </div>

          ))}

          <div className="p-6">

            <button className="w-full bg-yellow-500 text-black py-4 rounded-full font-bold">

              Book Now

            </button>

          </div>

        </motion.div>

      )}

    </nav>
  );
}