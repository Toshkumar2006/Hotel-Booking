import React, { useState, useEffect, useRef } from 'react';

const POPULAR_CITIES = [
  "All", "Goa", "Mumbai", "Delhi", "Bengaluru", "Chennai", "Jaipur", "Pune", "Kolkata", "Ahmedabad", "Noida"
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTc3NzV8MHwxfHNlYXJjaHw4fHxob3RlbHxlbnwwfHx8fDE3NTYzOTI4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTc3NzV8MHwxfHNlYXJjaHwyOHx8aG90ZWx8ZW58MHx8fHwxNzU2MzkzNTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1551918120-9739cb430c6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3OTc3NzV8MHwxfHNlYXJjaHw0MHx8aG90ZWx8ZW58MHx8fHwxNzU2MzkzNTcwfDA&ixlib=rb-4.1.0&q=80&w=1080"
];

const TESTIMONIALS = [
  {
    name: "Genevieve Dubois",
    role: "Luxury Travel Journalist",
    comment: "The concierge team at Hoteler redefined service. Every detail of our suite, from the customized Egyptian cotton sheets to the private aromatherapy session, was executed flawlessly. A true five-star haven.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  },
  {
    name: "Vikram Malhotra",
    role: "CEO, NexaCorp",
    comment: "Hoteler provides the ultimate balance of serenity and high-tech convenience. The booking was seamless, the rooftop pool was breathtaking, and the gourmet Michelin-starred kitchen served the finest menu I've had in years.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  },
  {
    name: "Dr. Elena Rostova",
    role: "Classical Violinist",
    comment: "A magnificent architectural masterpiece. The acoustics of the lounge, the warmth of the library fireplace, and the sweeping balcony views made my retreat unforgettable. I cannot recommend this luxury escape enough.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  }
];

export default function App() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("0");
  const [sortBy, setSortBy] = useState("-rating");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [limit, setLimit] = useState(12);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [bookingReceipt, setBookingReceipt] = useState(null);
  
  const [showDashboardPanel, setShowDashboardPanel] = useState(false);
  const [dashboardTab, setDashboardTab] = useState("bookings"); 

  const [activeHero, setActiveHero] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const [widgetCity, setWidgetCity] = useState("All");
  const [widgetGuests, setWidgetGuests] = useState("1");
  const [widgetCheckin, setWidgetCheckin] = useState("");
  const [widgetCheckout, setWidgetCheckout] = useState("");

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [bookingCheckin, setBookingCheckin] = useState("");
  const [bookingCheckout, setBookingCheckout] = useState("");
  const [roomType, setRoomType] = useState("standard");
  const [guestsCount, setGuestsCount] = useState("1");
  const [specialRequests, setSpecialRequests] = useState("");

  const detailsDialogRef = useRef(null);
  const receiptDialogRef = useRef(null);
  const roomsSectionRef = useRef(null);

  useEffect(() => {
    const savedBookings = localStorage.getItem('hoteler_bookings');
    if (savedBookings) setBookings(JSON.parse(savedBookings));
    const savedFavorites = localStorage.getItem('hoteler_favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchHotels(true);
  }, [selectedCity, sortBy, showFavoritesOnly]);

  const fetchHotels = async (reset = false) => {
    setLoading(true);
    setError(null);
    const currentSkip = reset ? 0 : skip;

    let url = `https://demohotelsapi.pythonanywhere.com/hotels/?limit=${limit}&skip=${currentSkip}&order_by=${sortBy}`;
    if (selectedCity && selectedCity !== "All") url += `&location=${encodeURIComponent(selectedCity)}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (minPrice) url += `&min_price=${minPrice}`;
    if (maxPrice) url += `&max_price=${maxPrice}`;
    if (minRating && minRating !== "0") url += `&min_rating=${minRating}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to load hotels from the server.");
      const data = await response.json();
      
      let processedData = data;
      if (showFavoritesOnly) processedData = data.filter(h => favorites.includes(h.id));
      
      if (reset) {
        setHotels(processedData);
        setSkip(limit);
        setHasMore(data.length === limit);
      } else {
        setHotels((prev) => [...prev, ...processedData]);
        setSkip((prev) => prev + limit);
        setHasMore(data.length === limit);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => fetchHotels(false);
  const handleApplyFilters = (e) => { e?.preventDefault(); fetchHotels(true); };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setSelectedCity(widgetCity);
    setBookingCheckin(widgetCheckin);
    setBookingCheckout(widgetCheckout);
    setGuestsCount(widgetGuests);
    roomsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCity("All");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("0");
    setSortBy("-rating");
    setShowFavoritesOnly(false);
    fetchHotels(true);
  };

  const toggleFavorite = (hotelId) => {
    let updated;
    if (favorites.includes(hotelId)) {
      updated = favorites.filter(id => id !== hotelId);
      if (showFavoritesOnly) setHotels(prev => prev.filter(h => h.id !== hotelId));
    } else {
      updated = [...favorites, hotelId];
    }
    setFavorites(updated);
    localStorage.setItem('hoteler_favorites', JSON.stringify(updated));
  };

  const handleOpenDetails = (hotel) => {
    setSelectedHotel(hotel);
    if (!bookingCheckin && widgetCheckin) setBookingCheckin(widgetCheckin);
    if (!bookingCheckout && widgetCheckout) setBookingCheckout(widgetCheckout);
    if (guestsCount === "1" && widgetGuests !== "1") setGuestsCount(widgetGuests);
    detailsDialogRef.current?.showModal();
  };

  const handleDialogClick = (e, ref) => {
    if (!ref.current) return;
    const dialogElement = ref.current;
    if (e.target === dialogElement) {
      const rect = dialogElement.getBoundingClientRect();
      const isInside = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      );
      if (!isInside) dialogElement.close();
    }
  };

  const calculateTotalCost = () => {
    if (!selectedHotel || !bookingCheckin || !bookingCheckout) return 0;
    const start = new Date(bookingCheckin);
    const end = new Date(bookingCheckout);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (isNaN(diffDays) || diffDays <= 0) return 0;

    let baseRate = parseFloat(selectedHotel.price);
    let multiplier = 1;
    if (roomType === "deluxe") multiplier = 1.4;
    if (roomType === "presidential") multiplier = 2.2;
    return (baseRate * multiplier * diffDays).toFixed(2);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!selectedHotel) return;
    const start = new Date(bookingCheckin);
    const end = new Date(bookingCheckout);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (isNaN(nights) || nights <= 0) {
      alert("Invalid checkout date. Checkout must be after Check-in.");
      return;
    }

    const totalCost = calculateTotalCost();
    const newBooking = {
      id: 'HTL-' + Math.floor(100000 + Math.random() * 90000),
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      hotelThumbnail: selectedHotel.thumbnail,
      hotelLocation: selectedHotel.location,
      guestName, guestEmail,
      checkin: bookingCheckin, checkout: bookingCheckout,
      nights, roomType, guestsCount, totalCost, specialRequests,
      dateBooked: new Date().toLocaleDateString()
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('hoteler_bookings', JSON.stringify(updatedBookings));

    setBookingReceipt(newBooking);
    detailsDialogRef.current?.close();
    setGuestName(""); setGuestEmail(""); setSpecialRequests("");
    
    setTimeout(() => { receiptDialogRef.current?.showModal(); }, 100);
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      const updated = bookings.filter(b => b.id !== bookingId);
      setBookings(updated);
      localStorage.setItem('hoteler_bookings', JSON.stringify(updated));
    }
  };

  const handlePrintReceipt = () => window.print();

  return (
    <div className="min-h-screen bg-[#0c0a08] text-neutral-100 font-inter selection:bg-luxury-gold selection:text-[#0c0a08] overflow-x-hidden">
      <header className="sticky top-0 z-40 w-full glass border-b border-luxury-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => roomsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center border border-luxury-gold/30 bg-[#161411]">
              <i className="fa-solid fa-crown text-luxury-gold text-lg"></i>
            </div>
            <div>
              <span className="font-playfair text-2xl font-bold tracking-widest text-luxury-gold">HOTELER</span>
              <span className="block text-[8px] tracking-[0.25em] text-neutral-400 uppercase font-inter">Luxury Hotels & Resorts</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wider uppercase text-neutral-300">
            <a href="#" className="hover:text-luxury-gold transition-colors duration-200">Home</a>
            <a href="#rooms" className="hover:text-luxury-gold transition-colors duration-200">Rooms & Suites</a>
            <a href="#amenities" className="hover:text-luxury-gold transition-colors duration-200">Amenities</a>
            <a href="#testimonials" className="hover:text-luxury-gold transition-colors duration-200">Testimonials</a>
          </nav>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button onClick={() => { setDashboardTab("favorites"); setShowDashboardPanel(true); }} className="relative p-2.5 rounded-full border border-luxury-gold/20 hover:border-luxury-gold/50 bg-[#1c1a17] text-neutral-300 hover:text-red-400 transition" title="My Wishlist Favorites">
              <i className="fa-solid fa-heart text-sm"></i>
              {favorites.length > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{favorites.length}</span>}
            </button>
            <button onClick={() => { setDashboardTab("bookings"); setShowDashboardPanel(true); }} className="relative p-2.5 rounded-full border border-luxury-gold/20 hover:border-luxury-gold/50 bg-[#1c1a17] text-neutral-300 hover:text-luxury-gold transition" title="My Bookings Portfolio">
              <i className="fa-solid fa-hotel text-sm"></i>
              {bookings.length > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-luxury-gold text-[#0f0e0c] text-[10px] font-bold rounded-full flex items-center justify-center">{bookings.length}</span>}
            </button>
            <a href="#rooms" className="hidden sm:inline-block px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-luxury-gold text-[#0c0a08] hover:bg-luxury-gold-hover rounded-sm transition shadow-lg shadow-luxury-gold/10">Book Now</a>
          </div>
        </div>
      </header>

      {/* DASHBOARD DRAWER */}
      {showDashboardPanel && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md h-full bg-[#14120f] border-l border-luxury-gold/20 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between animate-slide-up">
            <div>
              <div className="flex justify-between items-center border-b border-luxury-gold/15 pb-4 mb-6">
                <h3 className="font-playfair text-xl text-luxury-gold font-bold">Client Dashboard</h3>
                <button onClick={() => setShowDashboardPanel(false)} className="p-1 text-neutral-400 hover:text-luxury-gold transition-colors"><i className="fa-solid fa-xmark text-lg"></i></button>
              </div>
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#1c1a17] border border-luxury-gold/10 rounded mb-6 text-xs uppercase tracking-wider font-bold">
                <button onClick={() => setDashboardTab("bookings")} className={`py-2 text-center rounded transition cursor-pointer ${dashboardTab === "bookings" ? 'bg-luxury-gold text-[#0f0e0c]' : 'text-neutral-400 hover:text-neutral-200'}`}><i className="fa-solid fa-receipt mr-1.5"></i> Bookings ({bookings.length})</button>
                <button onClick={() => setDashboardTab("favorites")} className={`py-2 text-center rounded transition cursor-pointer ${dashboardTab === "favorites" ? 'bg-luxury-gold text-[#0f0e0c]' : 'text-neutral-400 hover:text-neutral-200'}`}><i className="fa-solid fa-heart mr-1.5"></i> Wishlist ({favorites.length})</button>
              </div>
              {dashboardTab === "bookings" ? (
                bookings.length === 0 ? (
                  <div className="text-center py-12 px-4 text-neutral-400">
                    <i className="fa-solid fa-receipt text-4xl mb-4 text-neutral-600"></i>
                    <p className="font-serif italic text-sm">No reservation history detected.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((b) => (
                      <div key={b.id} className="p-4 rounded-sm border border-luxury-gold/10 bg-[#1c1916] hover:border-luxury-gold/30 transition">
                        <div className="flex space-x-3">
                          <img src={b.hotelThumbnail} className="w-16 h-16 object-cover rounded-sm border border-luxury-gold/10" alt="Hotel" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-playfair text-sm text-neutral-100 font-bold truncate">{b.hotelName}</h4>
                            <p className="text-xs text-luxury-gold/80 flex items-center mt-0.5"><i className="fa-solid fa-location-dot mr-1 text-[10px]"></i>{b.hotelLocation}</p>
                            <span className="inline-block mt-2 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-luxury-gold/15 text-luxury-gold rounded">ID: {b.id}</span>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] border-t border-luxury-gold/5 pt-2 text-neutral-300">
                          <div><span className="block text-[9px] uppercase text-neutral-500">Check-in</span><strong>{b.checkin}</strong></div>
                          <div><span className="block text-[9px] uppercase text-neutral-500">Check-out</span><strong>{b.checkout}</strong></div>
                          <div><span className="block text-[9px] uppercase text-neutral-500">Nights</span><strong>{b.nights} Night(s)</strong></div>
                          <div><span className="block text-[9px] uppercase text-neutral-500">Cost</span><strong className="text-luxury-gold">₹{parseFloat(b.totalCost).toLocaleString('en-IN')}</strong></div>
                        </div>
                        <div className="mt-3 flex justify-between gap-2 border-t border-luxury-gold/5 pt-2">
                          <button onClick={() => { setBookingReceipt(b); receiptDialogRef.current?.showModal(); }} className="flex-1 text-[11px] uppercase py-1 bg-[#2e2b26] text-neutral-200 hover:bg-neutral-700 transition rounded-sm cursor-pointer">Receipt</button>
                          <button onClick={() => handleCancelBooking(b.id)} className="px-3 text-[11px] uppercase py-1 border border-red-500/30 text-red-400 hover:bg-red-950/20 transition rounded-sm cursor-pointer">Cancel</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                favorites.length === 0 ? (
                  <div className="text-center py-12 px-4 text-neutral-400">
                    <i className="fa-solid fa-heart-broken text-4xl mb-4 text-neutral-600"></i>
                    <p className="font-serif italic text-sm">Your wishlist is empty.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {favorites.map((favId) => {
                      const match = hotels.find(h => h.id === favId);
                      if (!match) return null;
                      return (
                        <div key={favId} className="flex items-center space-x-3 p-3 bg-[#1c1916] border border-luxury-gold/10 rounded hover:border-luxury-gold/30 transition">
                          <img src={match.thumbnail} className="w-16 h-16 object-cover rounded-sm border border-luxury-gold/10" alt="Hotel" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-playfair text-sm text-neutral-100 font-bold truncate">{match.name}</h4>
                            <p className="text-xs text-luxury-gold/80 flex items-center mt-0.5"><i className="fa-solid fa-location-dot mr-1 text-[10px]"></i>{match.location}</p>
                            <span className="block text-xs text-neutral-200 font-bold mt-1">₹{parseFloat(match.price).toLocaleString('en-IN')} / night</span>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <button onClick={() => { setShowDashboardPanel(false); handleOpenDetails(match); }} className="p-1.5 bg-luxury-gold text-[#0f0e0c] rounded hover:bg-luxury-gold-hover transition" title="Book Suite"><i className="fa-solid fa-calendar-plus text-xs"></i></button>
                            <button onClick={() => toggleFavorite(favId)} className="p-1.5 bg-neutral-800 text-red-400 hover:text-neutral-200 rounded hover:bg-neutral-700 transition" title="Remove Favorite"><i className="fa-solid fa-trash text-xs"></i></button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              )}
            </div>
            <div className="pt-6 border-t border-luxury-gold/15">
              <button onClick={() => setShowDashboardPanel(false)} className="w-full py-3 text-xs uppercase bg-luxury-gold text-[#0f0e0c] font-bold hover:bg-luxury-gold-hover transition cursor-pointer">Close Dashboard</button>
            </div>
          </div>
        </div>
      )}

      {/* HERO BANNER SLIDER */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {HERO_IMAGES.map((src, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-[2000ms] ${index === activeHero ? 'opacity-50' : 'opacity-0'}`}>
            <img src={src} className="w-full h-full object-cover hero-image-zoom" alt="Hero" fetchpriority={index === 0 ? "high" : "low"} />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-black/40 to-black/70"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-8">
          <div className="flex justify-center space-x-1 mb-4 animate-fade-in-up">
            {[1,2,3,4,5].map((s) => <i key={s} className="fa-solid fa-star text-luxury-gold text-xs"></i>)}
          </div>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white tracking-wide leading-tight mb-4 animate-fade-in-up">
            Book Your Dream Hotel <br /><span className="italic text-luxury-gold">with Hoteler Luxury</span>
          </h1>
          <p className="text-sm md:text-lg text-neutral-300 font-light max-w-2xl mx-auto mb-8 animate-fade-in-up">Discover breathtaking retreats, world-class amenities, and five-star hospitality.</p>
          
          <form onSubmit={handleHeroSearch} className="w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-[#14120f]/90 border border-luxury-gold/25 backdrop-blur-md rounded shadow-2xl text-left">
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-[10px] uppercase text-neutral-400 mb-1">Destination</label>
              <div className="relative">
                <i className="fa-solid fa-location-dot absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold text-xs"></i>
                <select value={widgetCity} onChange={(e) => setWidgetCity(e.target.value)} className="w-full bg-[#1e1a16] border border-neutral-700 text-neutral-200 text-xs rounded py-2.5 pl-8 outline-none">
                  {POPULAR_CITIES.map((c) => <option key={c} value={c}>{c === "All" ? "All Locations" : c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase text-neutral-400 mb-1">Check In</label>
              <div className="relative">
                <i className="fa-solid fa-calendar-days absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold text-xs"></i>
                <input type="date" value={widgetCheckin} onChange={(e) => setWidgetCheckin(e.target.value)} required className="w-full bg-[#1e1a16] border border-neutral-700 text-neutral-200 text-xs rounded py-2 pl-8 outline-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase text-neutral-400 mb-1">Check Out</label>
              <div className="relative">
                <i className="fa-solid fa-calendar-days absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold text-xs"></i>
                <input type="date" value={widgetCheckout} onChange={(e) => setWidgetCheckout(e.target.value)} required className="w-full bg-[#1e1a16] border border-neutral-700 text-neutral-200 text-xs rounded py-2 pl-8 outline-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase text-neutral-400 mb-1">Guests</label>
              <div className="relative">
                <i className="fa-solid fa-users absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold text-xs"></i>
                <select value={widgetGuests} onChange={(e) => setWidgetGuests(e.target.value)} className="w-full bg-[#1e1a16] border border-neutral-700 text-neutral-200 text-xs rounded py-2.5 pl-8">
                  {[1,2,3,4,5,6].map((num) => <option key={num} value={num}>{num} Guest(s)</option>)}
                </select>
              </div>
            </div>
            <button type="submit" className="col-span-2 md:col-span-1 bg-luxury-gold text-[#0f0e0c] font-bold text-xs uppercase tracking-wider hover:bg-luxury-gold-hover transition rounded py-3 md:py-0 cursor-pointer">Explore Now</button>
          </form>
        </div>
      </section>

      {/* QUICK CITY BADGES */}
      <section className="py-8 bg-[#0b0a08] border-b border-luxury-gold/5 overflow-x-auto whitespace-nowrap">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-start md:justify-center space-x-3">
          <span className="text-xs uppercase text-neutral-400 mr-2 flex items-center"><i className="fa-solid fa-map mr-2 text-luxury-gold"></i> Quick Locations:</span>
          {POPULAR_CITIES.map((city) => (
            <button key={city} onClick={() => { setSelectedCity(city); roomsSectionRef.current?.scrollIntoView({ behavior: 'smooth' }); }} className={`px-4 py-2 text-xs uppercase tracking-wider rounded transition cursor-pointer ${selectedCity === city ? 'bg-luxury-gold text-[#0c0a08] font-bold' : 'bg-[#181613] text-neutral-300 border border-neutral-800'}`}>
              {city}
            </button>
          ))}
        </div>
      </section>

      {/* FILTERS AND HOTELS GRID */}
      <section ref={roomsSectionRef} id="rooms" className="py-16 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="block text-xs uppercase tracking-[0.3em] text-luxury-gold font-semibold mb-2">Our Premium Suites</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">Curate Your Stay</h2>
          <div className="w-16 h-[2px] bg-luxury-gold mx-auto"></div>
        </div>

        {/* FILTERS PANEL */}
        <div className="glass p-6 rounded mb-10">
          <form onSubmit={handleApplyFilters} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
              <label className="block text-xs uppercase text-neutral-400 mb-2">Search Hotel / Location</label>
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-luxury-gold/80 text-sm"></i>
                <input type="text" placeholder="e.g. Haven Cascade" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-[#1c1a17] border border-neutral-800 rounded py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:border-luxury-gold" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs uppercase text-neutral-400 mb-2">Min Price (₹)</label>
                <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-full bg-[#1c1a17] border border-neutral-800 rounded py-2.5 px-3 text-sm focus:outline-none focus:border-luxury-gold" />
              </div>
              <div>
                <label className="block text-xs uppercase text-neutral-400 mb-2">Max Price (₹)</label>
                <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full bg-[#1c1a17] border border-neutral-800 rounded py-2.5 px-3 text-sm focus:outline-none focus:border-luxury-gold" />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase text-neutral-400 mb-2">Minimum Rating</label>
              <select value={minRating} onChange={(e) => setMinRating(e.target.value)} className="w-full bg-[#1c1a17] border border-neutral-800 rounded py-2.5 px-3 text-sm focus:outline-none">
                <option value="0">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase text-neutral-400 mb-2">Order & Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full bg-[#1c1a17] border border-neutral-800 rounded py-2.5 px-3 text-sm focus:outline-none">
                <option value="-rating">Top Rated (Descending)</option>
                <option value="rating">Lowest Rated</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
              </select>
            </div>
            <div className="col-span-1 md:col-span-4 flex flex-wrap items-center justify-between gap-4 mt-2 pt-4 border-t border-luxury-gold/5">
              <div className="flex items-center space-x-3 bg-[#1c1a17] px-4 py-2 border border-luxury-gold/10 rounded">
                <i className="fa-solid fa-heart text-red-500 text-sm animate-pulse"></i>
                <label htmlFor="favFilter" className="text-xs uppercase text-neutral-300 font-semibold cursor-pointer">Show Favorites Only</label>
                <input type="checkbox" id="favFilter" checked={showFavoritesOnly} onChange={(e) => setShowFavoritesOnly(e.target.checked)} className="w-4 h-4 accent-luxury-gold cursor-pointer" />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={handleResetFilters} className="px-6 py-2.5 border border-luxury-gold/20 text-neutral-300 hover:text-luxury-gold hover:border-luxury-gold text-xs font-semibold uppercase rounded transition cursor-pointer">Reset</button>
                <button type="submit" className="px-8 py-2.5 bg-luxury-gold text-[#0f0e0c] font-bold text-xs uppercase hover:bg-luxury-gold-hover rounded transition shadow-lg cursor-pointer"><i className="fa-solid fa-filter mr-2"></i> Apply Filters</button>
              </div>
            </div>
          </form>
        </div>

        {/* HOTEL ITEMS */}
        {loading && hotels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-2 border-luxury-gold border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-serif italic text-neutral-400">Loading fine accommodation lists...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 border border-red-500/20 bg-red-950/5 rounded">
            <i className="fa-solid fa-circle-exclamation text-red-500 text-3xl mb-4"></i>
            <p className="font-serif text-lg text-neutral-200">Unable to fetch records.</p>
            <button onClick={() => fetchHotels(true)} className="mt-6 px-6 py-2 bg-luxury-gold text-[#0c0a08] text-xs font-bold uppercase rounded cursor-pointer">Retry</button>
          </div>
        ) : hotels.length === 0 ? (
          <div className="text-center py-20 bg-[#161411] border border-luxury-gold/10 rounded">
            <i className="fa-solid fa-hotel text-neutral-600 text-4xl mb-4"></i>
            <p className="font-serif text-lg text-neutral-300">No hotels matched your configuration.</p>
            <button onClick={handleResetFilters} className="mt-6 px-6 py-2.5 bg-luxury-gold text-[#0c0a08] text-xs font-bold uppercase rounded cursor-pointer">View All Hotels</button>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map((hotel) => {
                const isFav = favorites.includes(hotel.id);
                return (
                  <div key={hotel.id} className="glass-premium rounded overflow-hidden flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:border-luxury-gold/30 hover:shadow-2xl">
                    <div className="relative h-64 overflow-hidden">
                      <HotelCardCarousel photos={hotel.photos || [hotel.thumbnail]} hotelName={hotel.name} />
                      <div className="absolute top-4 left-4 bg-luxury-gold text-[#0f0e0c] text-[10px] font-bold uppercase px-3 py-1 rounded-sm z-10">{hotel.location}</div>
                      <button onClick={(e) => { e.stopPropagation(); toggleFavorite(hotel.id); }} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-luxury-gold/20 flex items-center justify-center text-neutral-300 hover:text-red-500 hover:scale-110 active:scale-95 transition z-20 cursor-pointer" title="Wishlist">
                        <i className={`fa-solid fa-heart text-sm ${isFav ? 'text-red-500' : ''}`}></i>
                      </button>
                      <div className="absolute bottom-4 right-4 bg-[#0f0e0c]/85 border border-luxury-gold/20 text-luxury-gold text-xs font-bold py-1 px-2.5 rounded z-10">★ {hotel.rating.toFixed(1)}</div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-playfair text-xl text-neutral-100 font-bold truncate mb-2">{hotel.name}</h3>
                        <p className="text-xs text-neutral-400 line-clamp-3 mb-4 font-light">{hotel.description || "Indulge in a premium stay characterized by elegant decorations."}</p>
                        <div className="flex space-x-3 mb-6 text-neutral-400 text-sm">
                          <span className="w-8 h-8 rounded-full bg-[#1c1a17] border border-neutral-800 flex items-center justify-center hover:text-luxury-gold hover:border-luxury-gold/45 transition"><i className="fa-solid fa-wifi text-xs"></i></span>
                          <span className="w-8 h-8 rounded-full bg-[#1c1a17] border border-neutral-800 flex items-center justify-center hover:text-luxury-gold hover:border-luxury-gold/45 transition"><i className="fa-solid fa-dumbbell text-xs"></i></span>
                          <span className="w-8 h-8 rounded-full bg-[#1c1a17] border border-neutral-800 flex items-center justify-center hover:text-luxury-gold hover:border-luxury-gold/45 transition"><i className="fa-solid fa-spa text-xs"></i></span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-luxury-gold/10 pt-4">
                        <div>
                          <span className="block text-[9px] uppercase text-neutral-500">Suite Rate</span>
                          <span className="font-playfair text-lg text-luxury-gold font-bold">₹{parseFloat(hotel.price).toLocaleString('en-IN')}<span className="text-[10px] text-neutral-400 font-inter font-light"> / Night</span></span>
                        </div>
                        <div className="flex space-x-2">
                          <button onClick={() => handleOpenDetails(hotel)} className="px-4 py-2 border border-luxury-gold/20 hover:border-luxury-gold text-neutral-300 hover:text-luxury-gold text-xs uppercase rounded-sm transition cursor-pointer">Details</button>
                          <button onClick={() => handleOpenDetails(hotel)} className="px-4 py-2 bg-luxury-gold text-[#0f0e0c] font-bold text-xs uppercase hover:bg-luxury-gold-hover rounded-sm transition cursor-pointer">Book</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {hasMore && !showFavoritesOnly && (
              <div className="text-center mt-12">
                <button onClick={handleLoadMore} disabled={loading} className="px-8 py-3.5 bg-[#181613] hover:bg-luxury-gold text-neutral-200 hover:text-[#0f0e0c] font-bold text-xs uppercase rounded border border-luxury-gold/20 hover:border-luxury-gold transition shadow-xl cursor-pointer">
                  {loading ? "Fetching more suites..." : "Load Luxury Collections"}
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* AMENITIES */}
      <section id="amenities" className="py-20 bg-[#080706] border-t border-b border-luxury-gold/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="block text-xs uppercase text-luxury-gold font-semibold mb-2">We Provide Outdoor Excursions</span>
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-4">Activities & Facilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-premium p-8 rounded text-center border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-full border border-luxury-gold/20 flex items-center justify-center mx-auto mb-6 text-luxury-gold"><i className="fa-solid fa-water-ladder text-2xl"></i></div>
              <h3 className="font-playfair text-xl text-neutral-200 font-bold mb-4">Infinity Rooftop Pool</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">Float under the stars in our heated overflow pool.</p>
            </div>
            <div className="glass-premium p-8 rounded text-center border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-full border border-luxury-gold/20 flex items-center justify-center mx-auto mb-6 text-luxury-gold"><i className="fa-solid fa-hot-tub-person text-2xl"></i></div>
              <h3 className="font-playfair text-xl text-neutral-200 font-bold mb-4">Imperial Aroma Spa</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">Indulge in volcanic hot stone therapy prepared by certified spa consultants.</p>
            </div>
            <div className="glass-premium p-8 rounded text-center border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-300">
              <div className="w-16 h-16 rounded-full border border-luxury-gold/20 flex items-center justify-center mx-auto mb-6 text-luxury-gold"><i className="fa-solid fa-utensils text-2xl"></i></div>
              <h3 className="font-playfair text-xl text-neutral-200 font-bold mb-4">Michelin Fine Dining</h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">Savor hand-crafted cuisine composed by world-famous chefs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 max-w-5xl mx-auto px-4 text-center">
        <span className="block text-xs uppercase text-luxury-gold font-semibold mb-2">Guest Testimonials</span>
        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white mb-8">Voices of Luxury</h2>
        <div className="glass-premium p-8 md:p-12 rounded border border-luxury-gold/15 relative">
          <p className="text-lg md:text-xl font-serif italic text-neutral-200 leading-relaxed mb-6 font-light">"{TESTIMONIALS[activeTestimonial].comment}"</p>
          <div className="flex justify-center space-x-3">
            <img src={TESTIMONIALS[activeTestimonial].avatar} className="w-12 h-12 rounded-full border border-luxury-gold object-cover" alt="User" />
            <div className="text-left">
              <span className="block text-sm font-bold text-neutral-100">{TESTIMONIALS[activeTestimonial].name}</span>
              <span className="block text-xs text-luxury-gold font-medium uppercase tracking-wider">{TESTIMONIALS[activeTestimonial].role}</span>
            </div>
          </div>
          <div className="flex justify-center space-x-2 mt-8">
            {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setActiveTestimonial(i)} className={`w-2.5 h-2.5 rounded-full cursor-pointer ${activeTestimonial === i ? 'bg-luxury-gold w-6' : 'bg-neutral-600'}`}></button>)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050504] border-t border-luxury-gold/15 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-neutral-400">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center border border-luxury-gold/30 bg-[#161411]"><i className="fa-solid fa-crown text-luxury-gold text-sm"></i></div>
              <span className="font-playfair text-xl font-bold tracking-widest text-luxury-gold">HOTELER</span>
            </div>
            <p className="text-xs font-light">Crafting premium hospitality milestones across India.</p>
          </div>
          <div>
            <h4 className="font-playfair text-neutral-200 font-bold uppercase mb-4 border-b border-luxury-gold/10 pb-2">Destinations</h4>
            <ul className="space-y-2 text-xs font-light">
              <li><a href="#" className="hover:text-luxury-gold transition">Goa Coastal Havens</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition">Mumbai Presidential Suites</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition">Jaipur Heritage Palaces</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-playfair text-neutral-200 font-bold uppercase mb-4 border-b border-luxury-gold/10 pb-2">Office Address</h4>
            <address className="not-italic space-y-2 text-xs font-light">
              <p><i className="fa-solid fa-location-dot text-luxury-gold mr-2"></i> 88 Golden Mansion Street, Mumbai, India</p>
              <p><i className="fa-solid fa-phone text-luxury-gold mr-2"></i> +91 22 8888 7777</p>
            </address>
          </div>
          <div className="space-y-4">
            <h4 className="font-playfair text-neutral-200 font-bold uppercase mb-4 border-b border-luxury-gold/10 pb-2">Newsletter</h4>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscription successful."); }} className="flex">
              <input type="email" required placeholder="Email Address" className="w-full bg-[#181613] border border-neutral-800 rounded-l text-xs px-3 py-2 text-neutral-200 outline-none" />
              <button type="submit" className="bg-luxury-gold text-[#0f0e0c] font-bold text-xs uppercase px-4 rounded-r hover:bg-luxury-gold-hover cursor-pointer">Join</button>
            </form>
          </div>
        </div>
      </footer>

      {/* DETAIL MODAL */}
      <dialog ref={detailsDialogRef} onClick={(e) => handleDialogClick(e, detailsDialogRef)} className="w-full max-w-4xl bg-[#14120f] text-neutral-200 rounded p-0 overflow-y-auto max-h-[90vh] outline-none animate-slide-up">
        {selectedHotel && (
          <div className="flex flex-col">
            <div className="relative h-80 overflow-hidden">
              <HotelCardCarousel photos={selectedHotel.photos || [selectedHotel.thumbnail]} hotelName={selectedHotel.name} />
              <button onClick={() => detailsDialogRef.current?.close()} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-luxury-gold hover:text-[#0c0a08] transition z-30 cursor-pointer"><i className="fa-solid fa-xmark text-lg"></i></button>
            </div>
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="col-span-1 md:col-span-3 space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 bg-luxury-gold/15 text-luxury-gold text-[10px] font-bold uppercase tracking-wider rounded">{selectedHotel.location}</span>
                    <span className="text-luxury-gold text-xs font-semibold">★ {selectedHotel.rating.toFixed(1)} Stars</span>
                  </div>
                  <h2 className="font-playfair text-2xl md:text-3xl text-neutral-100 font-bold tracking-wide">{selectedHotel.name}</h2>
                </div>
                <div className="space-y-3">
                  <h4 className="font-playfair text-base text-luxury-gold font-bold border-b border-luxury-gold/10 pb-1">About The Estate</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">{selectedHotel.description || "Located in the quiet sanctuary of the premium location zone, this estate combines architectural elegance with top tier features."}</p>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 bg-[#1c1916] border border-luxury-gold/15 p-6 rounded shadow-inner">
                <h3 className="font-playfair text-lg text-luxury-gold font-bold mb-4 border-b border-luxury-gold/10 pb-2">Reserve Suite</h3>
                <form onSubmit={handleConfirmBooking} className="space-y-4 text-left">
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">Full Name</label>
                    <input type="text" required placeholder="e.g. John Doe" value={guestName} onChange={(e) => setGuestName(e.target.value)} className="w-full bg-[#14120f] border border-neutral-800 rounded py-2 px-3 text-xs focus:outline-none focus:border-luxury-gold" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 mb-1">Email Address</label>
                    <input type="email" required placeholder="john@example.com" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} className="w-full bg-[#14120f] border border-neutral-800 rounded py-2 px-3 text-xs focus:outline-none focus:border-luxury-gold" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-400 mb-1">Check In</label>
                      <input type="date" required value={bookingCheckin} onChange={(e) => setBookingCheckin(e.target.value)} className="w-full bg-[#14120f] border border-neutral-800 rounded py-2 px-2 text-[10px] focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-400 mb-1">Check Out</label>
                      <input type="date" required value={bookingCheckout} onChange={(e) => setBookingCheckout(e.target.value)} className="w-full bg-[#14120f] border border-neutral-800 rounded py-2 px-2 text-[10px] focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-400 mb-1">Suite Type</label>
                      <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-full bg-[#14120f] border border-neutral-800 rounded py-2 px-2 text-[10px] focus:outline-none">
                        <option value="standard">Standard Suite (1x rate)</option>
                        <option value="deluxe">Deluxe Room (1.4x rate)</option>
                        <option value="presidential">Presidential (2.2x rate)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-neutral-400 mb-1">Guests</label>
                      <select value={guestsCount} onChange={(e) => setGuestsCount(e.target.value)} className="w-full bg-[#14120f] border border-neutral-800 rounded py-2 px-2 text-[10px] focus:outline-none">
                        {[1,2,3,4,5,6].map((num) => <option key={num} value={num}>{num} Guest(s)</option>)}
                      </select>
                    </div>
                  </div>
                  {bookingCheckin && bookingCheckout && (
                    <div className="p-3 bg-[#14120f] border border-luxury-gold/10 rounded space-y-1 text-xs">
                      <div className="flex justify-between text-neutral-400"><span>Suite Rate:</span><span>₹{parseFloat(selectedHotel.price).toLocaleString('en-IN')} / night</span></div>
                      <div className="flex justify-between font-bold text-luxury-gold border-t border-luxury-gold/5 pt-1.5 mt-1"><span>Est. Total Cost:</span><span>₹{parseFloat(calculateTotalCost()).toLocaleString('en-IN')}</span></div>
                    </div>
                  )}
                  <button type="submit" className="w-full py-3 bg-luxury-gold text-[#0f0e0c] font-bold text-xs uppercase tracking-wider hover:bg-luxury-gold-hover transition rounded shadow-lg cursor-pointer">Confirm Booking</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </dialog>

      {/* RECEIPT MODAL */}
      <dialog ref={receiptDialogRef} onClick={(e) => handleDialogClick(e, receiptDialogRef)} className="w-full max-w-sm bg-[#1c1916] text-neutral-100 rounded border border-luxury-gold/25 p-0 outline-none animate-receipt-pop overflow-hidden">
        {bookingReceipt && (
          <div className="flex flex-col">
            <div className="bg-[#14120f] p-4 text-center border-b border-luxury-gold/20 flex justify-between items-center">
              <span className="text-xs uppercase font-bold text-luxury-gold">Booking Receipt</span>
              <button onClick={() => receiptDialogRef.current?.close()} className="text-neutral-400 hover:text-luxury-gold cursor-pointer"><i className="fa-solid fa-xmark text-base"></i></button>
            </div>
            <div className="p-6 bg-white text-[#222] font-mono text-xs flex flex-col space-y-4 shadow-inner relative border-b border-dashed border-neutral-300">
              <div className="text-center border-b border-dashed border-neutral-400 pb-3">
                <span className="block text-base font-bold tracking-widest">HOTELER LUXURY</span>
                <span className="block text-[9px] text-neutral-500 mt-1">Date: {bookingReceipt.dateBooked}</span>
              </div>
              <div className="space-y-1 pb-3 border-b border-dashed border-neutral-300">
                <div className="flex justify-between"><span>RES. ID:</span><span className="font-bold">{bookingReceipt.id}</span></div>
                <div className="flex justify-between"><span>GUEST:</span><span className="font-bold truncate uppercase max-w-[150px]">{bookingReceipt.guestName}</span></div>
              </div>
              <div className="space-y-1 pb-3 border-b border-dashed border-neutral-300">
                <div className="font-bold uppercase">{bookingReceipt.hotelName}</div>
                <div className="flex justify-between"><span>SUITE TYPE:</span><span className="uppercase">{bookingReceipt.roomType}</span></div>
                <div className="flex justify-between"><span>CHECK-IN:</span><span>{bookingReceipt.checkin}</span></div>
                <div className="flex justify-between"><span>CHECK-OUT:</span><span>{bookingReceipt.checkout}</span></div>
                <div className="flex justify-between"><span>DURATION:</span><span>{bookingReceipt.nights} Night(s)</span></div>
              </div>
              <div className="flex justify-between text-sm font-bold pt-1"><span>TOTAL PAID:</span><span>₹{parseFloat(bookingReceipt.totalCost).toLocaleString('en-IN')}</span></div>
              <div className="flex flex-col items-center pt-4 opacity-75">
                <div className="w-full h-8 bg-neutral-900 flex justify-around">
                  {[...Array(24)].map((_, i) => <div key={i} className="h-full bg-white" style={{ width: `${Math.floor(1 + Math.random() * 3)}px` }}></div>)}
                </div>
                <span className="text-[8px] mt-1 text-neutral-500 font-mono tracking-widest">{bookingReceipt.id}</span>
              </div>
            </div>
            <div className="p-4 bg-[#14120f] border-t border-luxury-gold/20 flex gap-2">
              <button onClick={handlePrintReceipt} className="flex-1 py-2 border border-luxury-gold/30 hover:border-luxury-gold text-luxury-gold hover:bg-luxury-gold/5 text-xs font-semibold uppercase rounded-sm transition cursor-pointer"><i className="fa-solid fa-print mr-1"></i> Print</button>
              <button onClick={() => { receiptDialogRef.current?.close(); setDashboardTab("bookings"); setShowDashboardPanel(true); }} className="flex-1 py-2 bg-luxury-gold text-[#0f0e0c] font-bold text-xs uppercase hover:bg-luxury-gold-hover rounded-sm transition cursor-pointer">Manage Bookings</button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}

function HotelCardCarousel({ photos, hotelName }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const handlePrev = (e) => { e.stopPropagation(); setCurrentIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1)); };
  const handleNext = (e) => { e.stopPropagation(); setCurrentIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1)); };

  if (!photos || photos.length === 0) return null;

  return (
    <div className="relative w-full h-full group/carousel">
      <img src={photos[currentIdx]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Gallery" loading="lazy" />
      {photos.length > 1 && (
        <>
          <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-luxury-gold/25 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition hover:bg-luxury-gold hover:text-[#0c0a08] cursor-pointer"><i className="fa-solid fa-chevron-left text-xs"></i></button>
          <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-luxury-gold/25 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition hover:bg-luxury-gold hover:text-[#0c0a08] cursor-pointer"><i className="fa-solid fa-chevron-right text-xs"></i></button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
            {photos.map((_, idx) => <button key={idx} onClick={(e) => { e.stopPropagation(); setCurrentIdx(idx); }} className={`w-1.5 h-1.5 rounded-full transition ${idx === currentIdx ? 'bg-luxury-gold scale-125' : 'bg-white/40'}`}></button>)}
          </div>
        </>
      )}
    </div>
  );
}
