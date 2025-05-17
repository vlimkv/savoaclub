import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#fdf9f4] text-[#2f2f2f]">
        <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
          <div className="text-xl font-serif font-bold">Savoa Club</div>
          <div className="space-x-4 text-sm">
            <Link to="/" className="hover:text-[#bfae97]">Главная</Link>
            <Link to="/about" className="hover:text-[#bfae97]">О нас</Link>
            <Link to="/events" className="hover:text-[#bfae97]">Ивенты</Link>
            <Link to="/shop" className="hover:text-[#bfae97]">Магазин</Link>
            <Link to="/contact" className="hover:text-[#bfae97]">Контакты</Link>
          </div>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
