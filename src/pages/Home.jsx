import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import background from "../assets/home.jpg";

export default function Home() {
  return (
    <AnimatePresence mode="wait">
      <div className="relative min-h-[75vh] sm:min-h-screen font-sans text-white overflow-hidden">
        {/* Background Image with zoom-in effect */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.6)), url(${background})`,
            maskImage: "linear-gradient(to bottom, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent)"
          }}
        />

        {/* Content Section */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.8 }}
  className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] sm:min-h-screen px-6 text-center"
>
  <div className="w-full max-w-[95%] sm:max-w-4xl px-4 sm:px-8"> {/* ← обновлённая ширина */}
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-5xl sm:text-4xl md:text-6xl font-light leading-snug sm:leading-tight mb-6 drop-shadow-2xl"
    >
      BREATHE. MOVE. GLOW.
    </motion.h1>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 1 }}
      className="mt-10"
    >
      <Link to="/events">
        <button className="px-8 py-4 rounded-full border border-white bg-white/90 text-[#004018] hover:bg-[#004018] hover:text-white transition duration-300 font-extralight text-base sm:text-lg uppercase tracking-wide">
          Записаться на ивент
        </button>
      </Link>
    </motion.div>
  </div>
</motion.div>

      </div>
    </AnimatePresence>
  );
}
