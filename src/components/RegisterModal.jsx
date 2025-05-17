import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RegisterModal({ open, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full relative text-[#004018] shadow-xl"
        >
          {/* Кнопка закрытия с анимацией появления и вращением при выходе */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl"
          >
            &times;
          </motion.button>

          <h2 className="text-2xl font-semibold mb-4">Регистрация на ивент</h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full px-4 py-2 border border-[#004018]/20 rounded-md focus:outline-[#004018]/50"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-[#004018]/20 rounded-md focus:outline-[#004018]/50"
            />
            <input
              type="tel"
              placeholder="Телефон"
              className="w-full px-4 py-2 border border-[#004018]/20 rounded-md focus:outline-[#004018]/50"
            />
            <button
              type="submit"
              className="w-full bg-[#004018] text-white py-2 rounded-full hover:bg-[#003015] transition"
            >
              Отправить заявку
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}