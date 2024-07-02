import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Review from "./Pages/Review";
import Reservation from "./Pages/Reservation";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { useEffect } from "react";
import AdminReview from "./Pages/AdminReview";
import AdminReservation from "./Pages/AdminReservation";

function App() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, []);
  return (
    <>
      <Router basename="/sea-salon">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/review" element={<Review />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminReview" element={<AdminReview />} />
          <Route path="/adminReservation" element={<AdminReservation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App

