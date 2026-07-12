import { motion } from "framer-motion";
import { Award, BedDouble, Users, ShieldCheck } from "lucide-react";

export default function About() {
  const stats = [
    {
      icon: BedDouble,
      value: "500+",
      label: "Luxury Rooms",
    },
    {
      icon: Users,
      value: "15K+",
      label: "Happy Guests",
    },
    {
      icon: Award,
      value: "25+",
      label: "Awards",
    },
    {
      icon: ShieldCheck,
      value: "24/7",
      label: "Service",
    },
  ];

  return (
    <section className="bg-[#0d0d0d] py-28 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Image */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400&auto=format&fit=crop"
            alt="Luxury Hotel"
            className="rounded-3xl shadow-2xl h-[600px] w-full object-cover"
          />

          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 to-transparent"></div>
        </motion.div>

        {/* Right Content */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[8px] text-yellow-400 mb-4">
            About Us
          </p>

          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Experience World-Class Hospitality
          </h2>

          <p className="text-gray-400 mt-8 leading-8 text-lg">
            At StayGo, every stay is designed to create unforgettable memories.
            From luxurious suites and fine dining to breathtaking views and
            exceptional service, we redefine comfort for travelers seeking the
            finest experiences.
          </p>

          <p className="text-gray-400 mt-6 leading-8 text-lg">
            Whether you're visiting for business or leisure, our commitment to
            excellence ensures every moment is relaxing, elegant, and truly
            extraordinary.
          </p>

          <button className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-bold hover:scale-105 transition">
            Discover More
          </button>
        </motion.div>

      </div>

      {/* Stats */}

      <div className="max-w-7xl mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">

        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-xl"
            >
              <Icon
                className="mx-auto text-yellow-400 mb-5"
                size={38}
              />

              <h3 className="text-4xl font-bold text-white">
                {item.value}
              </h3>

              <p className="text-gray-400 mt-2">
                {item.label}
              </p>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
}