import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import background from "../assets/home.jpg"; // добавь подходящий фон в папку assets

export default function Home() {
  return (
    <AnimatePresence mode="wait">
      <div
        className="min-h-screen bg-[#F8F0DE] text-[#004018] font-sans flex flex-col bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="flex-grow flex items-center justify-center p-0 backdrop-blur-sm bg-[#F8F0DE]/60"
        >
          <div className="text-center max-w-2xl px-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-light leading-tight mb-6"
            >
              Простота. Эстетика. Гармония.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-xl text-[#004018]/80 mb-8 leading-relaxed"
            >
              Savoa Club — пространство для вдохновения и внутреннего баланса. Почувствуй свою мягкую силу.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Link to="/events">
                <button className="px-6 py-3 rounded-full border border-[#004018] hover:bg-[#004018] hover:text-white transition duration-300 font-medium">
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