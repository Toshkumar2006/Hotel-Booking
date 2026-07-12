import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Emily Johnson",
    country: "United States",
    review:
      "Absolutely amazing experience. Beautiful rooms, friendly staff and breathtaking views.",
  },
  {
    name: "Daniel Smith",
    country: "United Kingdom",
    review:
      "The best luxury hotel I've ever stayed in. Everything was perfect from check-in to check-out.",
  },
  {
    name: "Sophia Lee",
    country: "Singapore",
    review:
      "Exceptional hospitality, delicious food and luxurious facilities. Highly recommended!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#0d0d0d] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[8px] text-yellow-400 mb-3">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold text-white">
            What Our Guests Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-3xl border border-white/10 p-8 backdrop-blur-xl"
            >
              <div className="flex gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-300 leading-8">
                "{review.review}"
              </p>

              <div className="mt-8">
                <h3 className="text-white font-bold text-xl">
                  {review.name}
                </h3>

                <p className="text-yellow-400">
                  {review.country}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}