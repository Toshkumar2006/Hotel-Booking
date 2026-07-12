// Small formatting helpers shared across the app.

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(value) {
  const number = Number(value);
  if (Number.isNaN(number)) return "—";
  return inr.format(number);
}

// join class names, skipping falsy values. tiny local clsx.
export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Turn a rating like 4.6 into a label people actually recognise.
export function ratingLabel(rating) {
  if (rating >= 4.5) return "Exceptional";
  if (rating >= 4) return "Excellent";
  if (rating >= 3.5) return "Very good";
  if (rating >= 3) return "Good";
  if (rating >= 2) return "Fair";
  return "Basic";
}
