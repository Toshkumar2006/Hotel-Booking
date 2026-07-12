import { motion } from "framer-motion";
import { Star, Wifi, Coffee, Waves, ArrowRight } from "lucide-react";

const rooms = [
  {
    id: 1,
    title: "Deluxe Ocean Suite",
    price: "$299",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Royal Luxury Room",
    price: "$399",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Presidential Suite",
    price: "$599",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function FeaturedRooms() {
  return (
    <section className="bg-[#0b0b0b] py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[8px] text-yellow-400 mb-3">
            Luxury Rooms
          </p>

          <h2 className="text-5xl font-bold text-white">
            Featured Suites
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Choose from our handpicked luxury accommodations designed for
            unforgettable experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">

          {rooms.map((room) => (

            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="overflow-hidden rounded-3xl bg-[#151515] border border-white/10 shadow-xl group"
            >

              <div className="overflow-hidden">

                <img
                  src={room.image}
                  alt={room.title}
                  className="h-72 w-full object-cover group-hover:scale-110 transition duration-700"
                />

              </div>

              <div className="p-7">

                <div className="flex justify-between items-center">

                  <h3 className="text-2xl text-white font-bold">
                    {room.title}
                  </h3>

                  <span className="text-yellow-400 text-xl font-bold">
                    {room.price}
                  </span>

                </div>

                <div className="flex gap-1 mt-4">

                  {[1,2,3,4,5].map((star)=>(
                    <Star
                      key={star}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}

                </div>

                <div className="flex gap-6 mt-6 text-gray-400">

                  <div className="flex items-center gap-2">
                    <Wifi size={18}/>
                    WiFi
                  </div>

                  <div className="flex items-center gap-2">
                    <Coffee size={18}/>
                    Breakfast
                  </div>

                  <div className="flex items-center gap-2">
                    <Waves size={18}/>
                    Pool
                  </div>

                </div>

                <button
                  className="mt-8 w-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 py-4 font-bold text-black flex items-center justify-center gap-2 hover:scale-105 transition"
                >
                  Book Now
                  <ArrowRight size={18}/>
                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}