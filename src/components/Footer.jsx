import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-[#F8F0DE] text-[#004018] border-t border-[#004018]/10 text-sm font-light tracking-wide shadow-[0_-2px_4px_rgba(0,0,0,0.04)]">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Лого и соцсети */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <img src={logo} alt="Savoa Logo" className="h-8" />
            <div className="flex gap-4 mt-2">
                <a
                    href="https://instagram.com/savoaclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#a0815c]"
                    aria-label="Instagram"
                >
                    <Instagram size={20} />
                </a>
                <a
                    href="https://wa.me/77760404661"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#a0815c]"
                    aria-label="WhatsApp"
                >
                    <FaWhatsapp size={20} />
                </a>
            </div>

        </div>

        {/* Навигация */}
        <div className="flex flex-col gap-2">
          <h4 className="uppercase text-xs font-semibold tracking-widest mb-2">Навигация</h4>
          <Link to="/" className="hover:underline">Главная</Link>
          <Link to="/about" className="hover:underline">О нас</Link>
          <Link to="/events" className="hover:underline">Ивенты</Link>
          <Link to="/shop" className="hover:underline">Магазин</Link>
          <Link to="/contact" className="hover:underline">Сотрудничество</Link>
        </div>

        {/* Подписка */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <h4 className="uppercase text-xs font-semibold tracking-widest">Подпишитесь на новости</h4>
          <form className="flex w-full max-w-xs">
            <input
              type="email"
              placeholder="Введите email"
              className="w-full px-3 py-2 rounded-l-md border border-[#004018]/30 focus:outline-none text-[#004018]"
            />
            <button
              type="submit"
              className="px-4 bg-[#004018] text-white rounded-r-md hover:bg-[#003015] transition"
            >
              OK
            </button>
          </form>
          <div className="text-xs text-[#004018]/60 mt-3 space-x-3">
            <Link to="/privacy" className="hover:underline">Политика конфиденциальности</Link>
            <Link to="/offer" className="hover:underline">Публичная оферта</Link>
          </div>
        </div>
      </div>

      {/* Низ */}
      <div className="text-center py-4 text-xs text-[#004018]/50 border-t border-[#004018]/10">
        © {new Date().getFullYear()} Savoa Club. Все права защищены.
      </div>
    </footer>
  );
}
