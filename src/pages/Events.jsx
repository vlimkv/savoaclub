import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import rooftopImage from "../assets/events/rooftop.jpg";
import RegisterModal from "../components/RegisterModal";

export default function Events() {
  const [modalOpen, setModalOpen] = useState(false);

  const event = {
    title: "Pilates on the Rooftop",
    date: "24 мая 2025",
    time: "11:00",
    location: "Sheraton Astana Rooftop",
    description: [
      "Приглашаем вас на утренний пилатес-класс под открытым небом — на крыше отеля Sheraton с лучшим видом на город.",
      "",
      "В программе:",
      "• тренировка с сертифицированным тренером Seza Amankeldi",
      "• освежающий матчa-сет после занятия",
      "• небольшой wellness-набор (вода, стикеры и сюрприз)",
      "• атмосфера заботы, спокойствия и мягкого перезапуска",
      "",
      "После регистрации и оплаты участницы получают доступ в закрытый Telegram-чат Savoa Club — для общения, напоминаний и бонусов.",
      "",
      "Места ограничены.",
    ],
    price: "15 000 ₸",
    image: rooftopImage,
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#f8f0de] to-[#f2e8d4] py-8 px-4 sm:px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-light text-[#004018] text-center mb-10"
        >
          Ближайшие ивенты
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/90 backdrop-blur-md border border-[#004018]/10 rounded-3xl overflow-hidden shadow-lg flex flex-col md:flex-row"
        >
          {/* Фото */}
          <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Контент */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#004018] mb-2">
                {event.title}
              </h2>
              <p className="text-sm text-[#004018]/70 mb-1">
                {event.date} — {event.time}
              </p>
              <p className="text-sm text-[#004018]/70 mb-4">{event.location}</p>

              <div className="text-sm text-[#004018]/90 leading-relaxed space-y-3">
                {event.description.map((line, idx) =>
                  line.trim() === "" ? <br key={idx} /> : <p key={idx}>{line}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-[#004018] text-base font-medium">{event.price}</span>
              <button
                onClick={() => setModalOpen(true)}
                className="px-5 py-2 rounded-full bg-[#004018] text-white hover:bg-[#003015] transition text-sm font-light"
              >
                Записаться
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Модалка */}
      <AnimatePresence>
        {modalOpen && (
          <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}