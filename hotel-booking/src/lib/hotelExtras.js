// The public API only gives us name/price/rating/photos, but the brief asks for
// reviews, availability and amenities per hotel. Rather than hardcode random
// data (which would flicker on every render), we derive everything from the
// hotel id using a tiny seeded PRNG so a given hotel always looks the same.

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const AMENITIES = [
  { key: "wifi", label: "Free WiFi" },
  { key: "pool", label: "Infinity Pool" },
  { key: "spa", label: "Spa & Wellness" },
  { key: "gym", label: "Fitness Center" },
  { key: "restaurant", label: "Fine Dining" },
  { key: "parking", label: "Valet Parking" },
  { key: "bar", label: "Rooftop Bar" },
  { key: "ac", label: "Air Conditioning" },
  { key: "breakfast", label: "Breakfast Included" },
  { key: "pet", label: "Pet Friendly" },
];

const REVIEWERS = [
  "Aarav Mehta", "Diya Sharma", "Kabir Nair", "Ananya Rao", "Vivaan Kapoor",
  "Ishaan Reddy", "Meera Iyer", "Rohan Gupta", "Saanvi Desai", "Arjun Menon",
  "Priya Banerjee", "Neha Chauhan", "Aditya Verma", "Tara Krishnan",
];

const HEADLINES = [
  "A stay we'll always remember",
  "Exceeded every expectation",
  "Perfect weekend getaway",
  "Would book again in a heartbeat",
  "Understated luxury done right",
  "Great location, greater service",
  "Comfortable and spotlessly clean",
  "Ideal for a business trip",
];

const BODIES = [
  "The staff went out of their way to make us feel at home. Rooms were immaculate and the view was even better than the photos.",
  "Check-in was seamless and the concierge helped us plan the whole trip. Breakfast spread was fantastic.",
  "Quiet, spacious and beautifully designed. The bed might be the most comfortable I've ever slept in.",
  "Loved the little touches — welcome drinks, fresh flowers, and a handwritten note. Felt genuinely cared for.",
  "Location is unbeatable, walking distance to everything. We'll definitely be coming back next season.",
  "Fantastic value for what you get. The spa was the highlight of our stay, totally worth it.",
];

const ROOM_TYPES = [
  { name: "Deluxe King Room", multiplier: 1, guests: 2 },
  { name: "Executive Suite", multiplier: 1.6, guests: 3 },
  { name: "Premium Ocean View", multiplier: 2.1, guests: 4 },
];

// Amenities: pick a stable subset of 5-7 per hotel.
export function getAmenities(id) {
  const rand = mulberry32(id * 7 + 13);
  return AMENITIES.filter(() => rand() > 0.35).slice(0, 7);
}

export function getReviews(id, rating) {
  const rand = mulberry32(id * 31 + 5);
  const count = 3 + Math.floor(rand() * 4);
  const reviews = [];

  for (let i = 0; i < count; i++) {
    const stars = Math.max(3, Math.min(5, Math.round(rating + (rand() - 0.5) * 1.4)));
    const daysAgo = 2 + Math.floor(rand() * 120);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    reviews.push({
      id: `${id}-${i}`,
      name: REVIEWERS[Math.floor(rand() * REVIEWERS.length)],
      headline: HEADLINES[Math.floor(rand() * HEADLINES.length)],
      body: BODIES[Math.floor(rand() * BODIES.length)],
      stars,
      date: date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    });
  }

  return reviews;
}

// A 14-day availability strip. Some nights are sold out, prices flex a little.
export function getAvailability(id, basePrice) {
  const rand = mulberry32(id * 17 + 3);
  const price = Number(basePrice) || 4000;
  const days = [];

  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const weekend = [0, 6].includes(date.getDay());
    const soldOut = rand() > 0.82;
    const flex = 1 + (rand() - 0.4) * 0.25 + (weekend ? 0.12 : 0);

    days.push({
      key: date.toISOString().slice(0, 10),
      label: date.toLocaleDateString("en-IN", { weekday: "short" }),
      day: date.getDate(),
      month: date.toLocaleDateString("en-IN", { month: "short" }),
      weekend,
      soldOut,
      price: Math.round((price * flex) / 10) * 10,
    });
  }

  return days;
}

export function getRoomTypes(basePrice) {
  const price = Number(basePrice) || 4000;
  return ROOM_TYPES.map((room) => ({
    ...room,
    price: Math.round((price * room.multiplier) / 10) * 10,
  }));
}

// Deterministic-ish review count for cards without loading the full review list.
export function getReviewCount(id) {
  const rand = mulberry32(id * 91 + 7);
  return 40 + Math.floor(rand() * 480);
}
