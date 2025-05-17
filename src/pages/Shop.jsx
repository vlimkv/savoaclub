import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Shop() {
  const [countdown, setCountdown] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  useEffect(() => {
    const targetDate = new Date("2025-06-01T10:00:00");

    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="w-full min-h-screen bg-gradient-to-b from-[#f8f0de] to-[#f2e8d4] flex items-center justify-center px-4 py-5 font-sans"
    >
      <div className="max-w-3xl w-full flex flex-col items-center text-center">
        <motion.img
            src="/coming-soon-illustration.gif" 
            alt="Coming Soon"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-64 sm:w-72 md:w-80"
        />

        {/* Заголовок */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-light text-[#004018] mb-4"
        >
          Магазин <span className="italic">Savoa</span> скоро откроется
        </motion.h1>

        {/* Подзаголовок */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-[#004018]/70 text-sm sm:text-base leading-relaxed max-w-xl mb-6"
        >
          Мы готовим коллекцию, вдохновлённую эстетикой, балансом и заботой.
          Подпишитесь в Instagram, чтобы не пропустить запуск!
        </motion.p>

        {/* Таймер */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 justify-center text-[#004018] text-sm sm:text-base font-medium tracking-wide mb-8"
        >
          {["days", "hours", "minutes", "seconds"].map((key, i) => (
            <div key={i} className="flex flex-col items-center min-w-[55px]">
              <div className="text-2xl font-bold">{countdown[key]}</div>
              <span>
                {key === "days"
                  ? "дней"
                  : key === "hours"
                  ? "часов"
                  : key === "minutes"
                  ? "минут"
                  : "секунд"}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Индикатор ожидания */}
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="h-[2px] w-12 bg-[#004018]/30 rounded-full mx-auto"
        />
      </div>
    </motion.div>
  );
}