import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import CreateTrip from "./components/create-trip";
import ViewTrip from "./components/view-trip";
import MyTrips from "./components/my-trips";
import Hero from "./components/custom/Hero";
import Header from "./components/custom/Header";
import Footer from "./components/custom/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/view-trip/:tripId" element={<ViewTrip />} />
        <Route path="/my-trips" element={<MyTrips />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
