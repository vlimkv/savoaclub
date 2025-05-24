import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Privacy from './pages/Privacy';
import Offer from './pages/Offer';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F8F0DE] text-[#004018] font-sans">
        {/* Навигация */}
        <Navbar />

        {/* Контент, растягивающийся на всю оставшуюся высоту */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/offer" element={<Offer />} />
          </Routes>
        </main>

        {/* Футер всегда внизу */}
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}
