import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import HotelDetails from "./pages/HotelDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
