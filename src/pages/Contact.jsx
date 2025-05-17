import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Добавь интеграцию (Telegram/email/DB)
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#f8f0de] to-[#f2e8d4] flex items-center justify-center px-4 py-20 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-xl bg-white/80 backdrop-blur-md border border-[#004018]/10 rounded-3xl shadow-xl p-8 sm:p-10"
      >
        <h1 className="text-3xl sm:text-4xl font-serif text-[#004018] font-light mb-4 text-center">
          Сотрудничество
        </h1>
        <p className="text-[#004018]/70 text-sm sm:text-base text-center mb-8 leading-relaxed">
          Мы открыты к партнёрству с брендами, которые разделяют наши ценности — заботу,
          эстетику, осознанность и любовь к деталям. <br />
          Если вы представляете компанию, кафе, студию или хотите предложить коллаборацию —
          будем рады обсудить.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-[#004018]">
            <div>
              <label className="block text-sm mb-1">Имя</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-[#ccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004018]/20"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-[#ccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004018]/20"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Сообщение</label>
              <textarea
                rows="4"
                required
                className="w-full px-4 py-2 border border-[#ccc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004018]/20"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#004018] hover:bg-[#003015] text-white py-2 rounded-full transition font-medium"
            >
              Отправить
            </button>
          </form>
        ) : (
          <div className="text-center py-8 text-[#004018]">
            <h2 className="text-xl font-semibold mb-3">Спасибо за интерес 🤍</h2>
            <p className="text-sm text-[#004018]/80">
              Мы получили ваше сообщение и скоро свяжемся.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
