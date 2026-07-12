import { useCallback, useEffect, useState } from "react";
import { getHotels } from "../services/hotelsApi.js";

// Fetches the full hotel list once and exposes loading / error / retry.
// The list is ~500 items which is fine to hold in memory; we filter client-side.

export function useHotels() {
  const [hotels, setHotels] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await getHotels();
      setHotels(Array.isArray(data) ? data : []);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Something went wrong");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { hotels, status, error, reload: load };
}
