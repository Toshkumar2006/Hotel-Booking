import { motion } from "framer-motion";
import { div } from "framer-motion/client";

export default function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/80"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-yellow-400 tracking-[12px] uppercase mb-6 text-sm md:text-base font-light"
        >
          Luxury • Comfort • Elegance
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-extrabold leading-tight text-white drop-shadow-2xl"
        >
          Experience Luxury <br /> Like Never Before
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300 max-w-2xl mt-6 text-lg"
        >
          Discover elegant rooms, world-class amenities, and unforgettable
          hospitality. Your perfect stay starts here.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-bold shadow-2xl hover:scale-105 transition-all duration-300"        >
          Book Your Stay
        </motion.button>

        {/* Booking Card */}
        <motion.div
    initial={{opacity:0,y:50}}
    animate={{
        opacity:1,
        y:[0,-8,0]
    }}
    transition={{
        duration:4,
        repeat:Infinity
    }}
    className="mt-16 bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl p-6 w-[92%] max-w-6xl">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <input
              type="date"
              className = "h-16 bg-black/20 border border-white/10 rounded-2xl px-5 text-lg text-white focus:border-yellow-400 transition"
              />

            <input
              type="date"
              className="h-16 bg-black/20 border border-white/10 rounded-2xl px-5 text-lg text-white focus:border-yellow-400 transition"
            />

            <select className="h-16 bg-black/20 border border-white/10 rounded-2xl px-5 text-lg text-white focus:border-yellow-400 transition">
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4 Guests</option>
            </select>

            <button className="h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-bold text-lg shadow-xl hover:scale-105 hover:shadow-yellow-500/40 transition-all duration-300">
              Check Availability
            </button>
          </div>
        </motion.div>
      </div>
      <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 1.5 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
>
    <div className="w-7 h-12 border-2 border-white/60 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2"></div>
    </div>
</motion.div>
    </section>
  );
}