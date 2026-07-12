import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <section className="bg-[#080808] py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto rounded-[40px] bg-gradient-to-r from-[#151515] to-[#0f0f0f] border border-yellow-500/20 p-12 text-center shadow-2xl"
      >
        <p className="uppercase tracking-[8px] text-yellow-400 mb-4">
          Newsletter
        </p>

        <h2 className="text-5xl font-bold text-white">
          Stay Updated
        </h2>

        <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
          Get exclusive offers, luxury travel inspiration and special
          discounts directly in your inbox.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 md:max-w-lg h-16 rounded-full bg-black/30 border border-white/10 px-6 text-white outline-none focus:border-yellow-400"
          />

          <button className="h-16 px-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-bold hover:scale-105 transition">
            Subscribe
          </button>
        </div>
      </motion.div>
    </section>
  );
}