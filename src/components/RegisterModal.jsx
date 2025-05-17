import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendTelegramMessage } from "../utils/sendTelegramMessage";
import Cookies from "js-cookie";

export default function RegisterModal({ open, onClose, eventName }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const progressRef = useRef(null);
  const nameInputRef = useRef(null);

  // Проверка на повторную заявку при открытии
  useEffect(() => {
    if (open) {
      const cookie = Cookies.get("savoa_submitted");
      if (cookie) setAlreadySubmitted(true);
      else setAlreadySubmitted(false);
    }
  }, [open]);

  // Auto-focus
  useEffect(() => {
    if (open && nameInputRef.current && !alreadySubmitted && !submitted) {
      setTimeout(() => nameInputRef.current.focus(), 150);
    }
  }, [open, alreadySubmitted, submitted]);

  // Escape
  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Автозакрытие
  useEffect(() => {
    if (submitted) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`;
        }
        if (progress >= 100) {
          clearInterval(interval);
          onClose();
          setSubmitted(false);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [submitted, onClose]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Введите имя";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Введите корректный email";
    if (!form.phone.match(/^(\+7|8)?7\d{9}$/))
      newErrors.phone = "Введите корректный номер (например, 87001234567)";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShake(true);
      if (navigator.vibrate) navigator.vibrate(200);
      setTimeout(() => setShake(false), 400);
      return;
    }

    try {
      await sendTelegramMessage({ ...form, eventName });
      Cookies.set("savoa_submitted", "true", { expires: 30 });
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "" });
      const audio = new Audio("/success.mp3");
      audio.play();
    } catch {
      alert("Ошибка отправки. Попробуйте позже.");
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center px-2 sm:px-4"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={submitted ? "thanks" : alreadySubmitted ? "duplicate" : "form"}
            drag="y"
            dragConstraints={{ top: 0, bottom: 100 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.y > 80) onClose();
            }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`w-full max-w-md sm:max-w-lg bg-white rounded-t-2xl p-6 pt-10 shadow-2xl relative text-[#004018] ${
              shake ? "animate-shake" : ""
            }`}
          >
            <motion.button
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute top-3 right-4 text-[#777] hover:text-black text-2xl"
              aria-label="Закрыть"
            >
              &times;
            </motion.button>

            {/* Повторная заявка */}
            {alreadySubmitted ? (
              <div className="text-center py-4">
                <h2 className="text-xl font-semibold mb-3">
                  Вы уже отправили заявку
                </h2>
                <p className="text-sm text-[#004018]/80 mb-5">
                  Если вы хотите внести изменения — напишите нам.
                </p>
                <a
                  href="https://wa.me/77760404661"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="whatsapp"
                    className="w-5 h-5"
                  />
                  WhatsApp
                </a>
              </div>
            ) : submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center px-2 sm:px-6 py-6"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4 shadow-md">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="whatsapp"
                    className="w-10 h-10"
                  />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-[#004018]">
                  Спасибо за регистрацию!
                </h2>
                <p className="text-sm sm:text-base text-[#004018]/80 max-w-md mb-5 leading-relaxed">
                  Мы свяжемся с вами в ближайшее время. Или напишите напрямую:
                </p>
                <a
                  href="https://wa.me/77760404661"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition text-sm sm:text-base font-medium shadow-md"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="whatsapp"
                    className="w-5 h-5"
                  />
                  WhatsApp
                </a>
                <div className="w-full h-[4px] mt-6 bg-[#e6e6e6] rounded-full overflow-hidden">
                  <div
                    ref={progressRef}
                    className="h-full bg-green-500 transition-all duration-100 ease-linear"
                    style={{ width: "0%" }}
                  />
                </div>
              </motion.div>
            ) : (
              <>
                <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-center">
                  Регистрация на ивент
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    ref={nameInputRef}
                    type="text"
                    placeholder="Ваше имя"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#004018]/20 ${
                      errors.name ? "border-red-400" : "border-[#ccc]"
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}

                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#004018]/20 ${
                      errors.email ? "border-red-400" : "border-[#ccc]"
                    }`}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

                  <input
                    type="tel"
                    placeholder="Телефон"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#004018]/20 ${
                      errors.phone ? "border-red-400" : "border-[#ccc]"
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}

                  <button
                    type="submit"
                    className="w-full py-2 bg-[#004018] text-white rounded-full hover:bg-[#003015] transition font-medium"
                  >
                    Отправить заявку
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}