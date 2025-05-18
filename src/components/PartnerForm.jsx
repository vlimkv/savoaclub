// src/components/PartnerForm.jsx

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

export default function PartnerForm() {
  const [form, setForm] = useState({ name: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [alreadySent, setAlreadySent] = useState(false);
  const [shake, setShake] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const progressRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (Cookies.get("savoa_partner")) {
      setAlreadySent(true);
    }
  }, []);

  useEffect(() => {
    if (!alreadySent && nameInputRef.current) {
      setTimeout(() => nameInputRef.current.focus(), 100);
    }
  }, [alreadySent]);

  useEffect(() => {
    if (sent) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`;
        }
        if (progress >= 100) {
          clearInterval(interval);
          setShowModal(false);
          setSent(false);
          setAlreadySent(true);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [sent]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Введите имя или бренд";
    if (!form.message.trim()) newErrors.message = "Введите сообщение";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShake(true);
      if (navigator.vibrate) navigator.vibrate(200);
      setTimeout(() => setShake(false), 400);
      return;
    }

    if (Cookies.get("savoa_partner")) {
      setAlreadySent(true);
      return;
    }

    try {
      const res = await fetch(`https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: import.meta.env.VITE_TELEGRAM_CHAT,
          text: `🤝 *Заявка на сотрудничество*\n\n👤 *Имя/Бренд:* ${form.name}\n💬 *Сообщение:* ${form.message}\n🕒 ${new Date().toLocaleString("ru-RU")}`,
          parse_mode: "Markdown",
        }),
      });

      if (!res.ok) throw new Error("Telegram error");

      Cookies.set("savoa_partner", "true", { expires: 30 });
      const audio = new Audio("/success.mp3");
      audio.play();
      setSent(true);
      setShowModal(true);
      setForm({ name: "", message: "" });
    } catch (err) {
      console.error("Telegram error:", err);
      if (!Cookies.get("savoa_partner")) {
        alert("Ошибка при отправке. Попробуйте позже.");
      }
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h2 className="text-2xl sm:text-3xl text-[#004018] font-light text-center mb-6">
        Сотрудничество
      </h2>
      <p className="text-center text-[#004018]/80 mb-8">
        Мы открыты к партнёрству с брендами, которые разделяют наши ценности — заботу, эстетику, осознанность и любовь к деталям.
      </p>

      <AnimatePresence mode="wait">
        {alreadySent ? (
          <motion.div
            key="already"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 rounded-2xl shadow-lg p-6 text-center"
          >
            <h3 className="text-xl font-medium text-[#004018] mb-3">Вы уже отправили заявку</h3>
            <p className="text-sm text-[#004018]/70 mb-4">
              Если хотите внести изменения — напишите нам напрямую:
            </p>
            <a
              href="https://wa.me/77760404661"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
              WhatsApp
            </a>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className={`bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl space-y-4 ${
              shake ? "animate-shake" : ""
            }`}
          >
            <input
              ref={nameInputRef}
              type="text"
              placeholder="Ваше имя или бренд"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004018]/30 ${
                errors.name ? "border-red-400" : "border-[#ccc]"
              }`}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

            <textarea
              placeholder="Расскажите о предложении или партнёрстве"
              value={form.message}
              rows={4}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004018]/30 ${
                errors.message ? "border-red-400" : "border-[#ccc]"
              }`}
            />
            {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}

            <button
              type="submit"
              className="w-full bg-[#004018] text-white py-2 rounded-full hover:bg-[#003015] transition"
            >
              Отправить заявку
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Успешная модалка */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center px-2 sm:px-4"
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white w-full max-w-md sm:max-w-lg rounded-2xl shadow-2xl p-6 pt-10 mb-4 text-center text-[#004018]"
            >
              <div className="w-16 h-16 mb-4 mx-auto bg-green-100 rounded-full flex items-center justify-center shadow-md">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="whatsapp"
                  className="w-10 h-10"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                Спасибо за заявку!
              </h2>
              <p className="text-sm sm:text-base text-[#004018]/80 leading-relaxed mb-5">
                Мы свяжемся с вами в ближайшее время. Или напишите нам напрямую:
              </p>
              <a
                href="https://wa.me/77760404661"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition text-sm font-medium"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}