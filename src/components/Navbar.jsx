import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Главная" },
    { path: "/about", label: "О нас" },
    { path: "/events", label: "Ивенты" },
    { path: "/shop", label: "Магазин" },
    { path: "/contact", label: "Контакты" },
  ];

  return (
    <>
      {/* Elegant top info bar */}
      <div className="w-full bg-[#F8F0DE] border-b border-[#004018]/10">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <p className="text-center text-sm text-[#004018] font-light tracking-tight">
            <span className="block sm:inline">Место, где</span>{" "}
            <span className="italic">энергия</span>, <span className="italic">забота</span> и <span className="italic">вдохновение</span> соединяются.
          </p>
        </div>
      </div>

      <nav className="w-full bg-[#F8F0DE] border-b border-[#004018]/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 relative flex items-center justify-between">
          {/* Burger button for mobile */}
          <div className="md:hidden z-20">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#004018]">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-[#004018] z-20">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative transition hover:opacity-80 ${
                  location.pathname === path
                    ? "font-semibold after:absolute after:bottom-0 after:left-1/4 after:w-1/2 after:h-[1px] after:bg-[#004018]/40 after:rounded-full after:content-['']"
                    : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Centered logo with fade-in */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex justify-center items-center pointer-events-none"
          >
            <Link to="/" className="pointer-events-auto">
              <img src={logo} alt="Savoa Logo" className="h-12 object-contain" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile menu with animation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm font-medium text-[#004018]"
            >
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`transition hover:underline ${
                    location.pathname === path ? "font-semibold underline underline-offset-4" : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
