import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white">

      <div className="max-w-7xl mx-auto px-6 py-24 text-center">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold"
        >
          Find Your Perfect Stay
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          className="mt-6 text-xl"
        >
          Search thousands of hotels around the world.
        </motion.p>

      </div>

    </section>
  );
}

export default Hero;
