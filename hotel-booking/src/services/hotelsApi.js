// Thin wrapper around the demo hotels API. Keeping all the fetch logic in one
// place means the rest of the app never has to know the URL shape or the
// slightly awkward `{ status, data }` envelope the API returns.

const BASE_URL = "https://demohotelsapi.pythonanywhere.com/hotels";

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);

  if (!res.ok) {
    throw new Error(`Request failed (${res.status}) — please try again.`);
  }

  const json = await res.json();
  return json.data;
}

export function getHotels() {
  return request("/");
}

export function getHotelById(id) {
  return request(`/${id}/`);
}
