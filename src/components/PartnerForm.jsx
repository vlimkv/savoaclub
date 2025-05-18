
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import PartnerSuccessModal from "./PartnerSuccessModal";

export default function PartnerForm() {
  const [form, setForm] = useState({ name: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [shake, setShake] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alreadyModal, setAlreadyModal] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
      setTimeout(() => nameInputRef.current.focus(), 100);
    }
  }, []);

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

    if (Cookies.get("savoa_partner") === "true") {
      setAlreadyModal(true);
      setShowModal(true);
      return;
    }

    try {
      const botToken = import.meta.env.VITE_TELEGRAM_BOT;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT;

      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
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
      console.error("Ошибка при отправке:", err);
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
        Мы открыты к партнёрству с брендами, которые разделяют наши ценности — заботу, эстетику,
        осознанность и любовь к деталям.
      </p>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl space-y-4 ${shake ? "animate-shake" : ""}`}
      >
        <input
          ref={nameInputRef}
          type="text"
          placeholder="Ваше имя или бренд"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004018]/30 \${errors.name ? "border-red-400" : "border-[#ccc]"}`}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

        <textarea
          placeholder="Расскажите о предложении или партнёрстве"
          value={form.message}
          rows={4}
          onChange={(e) => handleChange("message", e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004018]/30 ${errors.message ? "border-red-400" : "border-[#ccc]"}`}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}

        <button
          type="submit"
          className="w-full bg-[#004018] text-white py-2 rounded-full hover:bg-[#003015] transition"
        >
          Отправить заявку
        </button>
      </motion.form>

      <PartnerSuccessModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSent(false);
          setAlreadyModal(false);
        }}
        already={alreadyModal}
      />
    </div>
  );
}
