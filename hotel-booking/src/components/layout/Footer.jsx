import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-4xl font-bold text-white">
            Stay<span className="text-yellow-400">Go</span>
          </h2>

          <p className="text-gray-400 mt-6">
            Experience luxury hospitality with elegant rooms,
            world-class amenities and unforgettable memories.
          </p>
        </div>

        <div>
          <h3 className="text-white text-xl font-bold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>Home</li>
            <li>Rooms</li>
            <li>Gallery</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-xl font-bold mb-5">
            Contact
          </h3>

          <div className="space-y-4 text-gray-400">

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt size={18} />
              New Delhi, India
            </div>

            <div className="flex items-center gap-3">
              <FaPhone size={18} />
              +91 9876543210
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope size={18} />
              hello@staygo.com
            </div>

          </div>
        </div>

        <div>
          <h3 className="text-white text-xl font-bold mb-5">
            Follow Us
          </h3>

          <div className="flex gap-4">

            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition cursor-pointer">
              <FaFacebookF size={20} />
            </div>

            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition cursor-pointer">
              <FaInstagram size={20} />
            </div>

            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition cursor-pointer">
              <FaTwitter size={20} />
            </div>

          </div>
        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-gray-500">
        © 2026 StayGo. All Rights Reserved.
      </div>

    </footer>
  );
}