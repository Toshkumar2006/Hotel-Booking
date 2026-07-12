import { motion } from "framer-motion";
import { BedDouble, Users, Award, Smile } from "lucide-react";

const stats = [
  {
    icon: BedDouble,
    number: "500+",
    title: "Luxury Rooms",
  },
  {
    icon: Users,
    number: "15K+",
    title: "Happy Guests",
  },
  {
    icon: Award,
    number: "25+",
    title: "International Awards",
  },
  {
    icon: Smile,
    number: "98%",
    title: "Customer Satisfaction",
  },
];

export default function Stats() {
  return (
    <section className="bg-[#090909] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[8px] text-yellow-400 mb-3">
            Our Achievements
          </p>

          <h2 className="text-5xl font-bold text-white">
            Trusted Around The World
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Thousands of travelers choose StayGo every year for exceptional
            comfort, premium hospitality, and unforgettable experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl text-center hover:border-yellow-400 transition"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 flex items-center justify-center mx-auto mb-6">
                  <Icon size={36} className="text-black" />
                </div>

                <h3 className="text-5xl font-bold text-white">
                  {item.number}
                </h3>

                <p className="text-gray-400 mt-4">
                  {item.title}
                </p>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}