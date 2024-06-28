import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Review from "./Pages/Review";
import Reservation from "./Pages/Reservation";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Review" element={<Review />} />
          <Route path="/Reservation" element={<Reservation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App

