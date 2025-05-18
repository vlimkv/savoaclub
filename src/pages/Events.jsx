import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import rooftopImage from "../assets/events/rooftop.jpg";
import RegisterModal from "../components/RegisterModal";
import Cookies from "js-cookie";

export default function Events() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("form");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      title: "Pilates on the Rooftop",
      date: "24 мая 2025",
      time: "10:00",
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
      isSoldOut: true,
    },
  ];

  const handleOpenModal = (event) => {
    const submittedBefore = Cookies.get("savoa_submitted");
    setSelectedEvent(event);
    setModalMode(submittedBefore ? "info" : "form");
    setModalOpen(true);
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#f8f0de] to-[#f2e8d4] py-12 px-4 sm:px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-light text-[#004018] text-center mb-10"
        >
          Ближайшие ивенты
          <div className="mt-3 h-[2px] w-12 bg-[#004018]/30 mx-auto rounded-full" />
        </motion.h1>

        <div className="space-y-10">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 + idx * 0.2 }}
              className={`relative bg-white/90 backdrop-blur-md border border-[#004018]/10 rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row ${
                event.isSoldOut ? "opacity-60" : ""
              }`}
            >
              {event.isSoldOut && (
                <div className="absolute top-7 right-[-35px] z-50 rotate-45 bg-[#004018] text-white text-[11px] sm:text-[12px] font-semibold tracking-[0.25em] uppercase w-[160px] text-center py-[4px] shadow-lg rounded-sm pointer-events-none">
                  Sold Out
                </div>
              )}

              <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between relative z-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#004018] mb-2">
                    {event.title}
                  </h2>
                  <p className="text-sm text-[#004018]/70 mb-1">
                    {event.date} — {event.time}
                  </p>
                  <p className="text-sm text-[#004018]/70 mb-4">
                    {event.location}
                  </p>

                  <div className="text-sm text-[#004018]/90 leading-relaxed space-y-3">
                    {event.description.map((line, i) =>
                      line.trim() === "" ? <br key={i} /> : <p key={i}>{line}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[#004018] text-base font-medium">
                    {event.price}
                  </span>

                  {event.isSoldOut ? (
                    <span className="px-5 py-2 rounded-full bg-gray-300 text-gray-600 text-sm font-medium cursor-not-allowed">
                      Sold Out
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenModal(event)}
                      className="px-5 py-2 rounded-full bg-[#004018] text-white hover:bg-[#003015] transition text-sm font-light"
                    >
                      Записаться
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && selectedEvent && (
          <RegisterModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            eventName={selectedEvent.title}
            mode={modalMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
