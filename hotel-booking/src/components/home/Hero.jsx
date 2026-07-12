import { motion } from "framer-motion";
import { Calendar, Users, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/85"></div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 text-center">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[12px] text-yellow-400 text-sm mb-6"
        >
          Luxury • Comfort • Elegance
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: .9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .8 }}
          className="text-5xl md:text-8xl font-extrabold text-white leading-tight"
        >
          Experience Luxury <br />
          Like Never Before
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          className="mt-8 max-w-3xl mx-auto text-gray-300 text-lg"
        >
          Discover elegant suites, breathtaking views and unforgettable
          hospitality. Your dream vacation begins here.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: .95 }}
          className="mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-bold shadow-2xl"
        >
          Explore Rooms
        </motion.button>

        {/* Booking Card */}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .6 }}
          whileHover={{ y: -5 }}
          className="mt-20 mx-auto w-full max-w-6xl bg-white/10 backdrop-blur-3xl border border-yellow-500/20 rounded-3xl shadow-[0_0_40px_rgba(234,179,8,0.08)] p-6 md:p-8"
        >

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* Check In */}

            <div>

              <label className="block text-xs uppercase tracking-[3px] text-gray-300 mb-2">
                Check In
              </label>

              <div className="relative">

                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400"
                  size={20}
                />

                <input
                  type="date"
                  className="w-full h-16 pl-12 pr-4 rounded-2xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-yellow-400"
                />

              </div>

            </div>

            {/* Check Out */}

            <div>

              <label className="block text-xs uppercase tracking-[3px] text-gray-300 mb-2">
                Check Out
              </label>

              <div className="relative">

                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400"
                  size={20}
                />

                <input
                  type="date"
                  className="w-full h-16 pl-12 pr-4 rounded-2xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-yellow-400"
                />

              </div>

            </div>

            {/* Guests */}

            <div>

              <label className="block text-xs uppercase tracking-[3px] text-gray-300 mb-2">
                Guests
              </label>

              <div className="relative">

                <Users
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400"
                  size={20}
                />

                <select
                  className="w-full h-16 pl-12 pr-4 rounded-2xl bg-black/20 border border-white/10 text-white appearance-none focus:outline-none focus:border-yellow-400"
                >
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                </select>

              </div>

            </div>

            {/* Button */}

            <div className="flex items-end">

              <button
                className="w-full h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-bold text-lg hover:scale-[1.02] transition"
              >
                Check Availability
              </button>

            </div>

          </div>

        </motion.div>

      </div>

      {/* Scroll */}

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-10 h-16 rounded-full border-2 border-white/50 flex justify-center items-start pt-2">
          <ChevronDown className="text-yellow-400" />
        </div>
      </motion.div>

    </section>
  );
}