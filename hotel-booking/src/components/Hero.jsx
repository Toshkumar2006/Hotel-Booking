function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-500 text-white">
      <div className="max-w-7xl mx-auto py-28 px-6 text-center">
        <h1 className="text-6xl font-extrabold">
          Discover Luxury Hotels
        </h1>

        <p className="mt-6 text-xl">
          Book hotels across India at the best prices.
        </p>

        <a
          href="#hotels"
          className="inline-block mt-10 bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100"
        >
          Explore Hotels
        </a>
      </div>
    </section>
  );
}

export default Hero;
