// src/components/PartnerSuccessModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

export default function PartnerSuccessModal({ show, onClose }) {
  const progressRef = useRef(null);

  useEffect(() => {
    if (show) {
      let progress = 0;
      const timer = setInterval(() => {
        progress += 2;
        if (progressRef.current) {
          progressRef.current.style.width = `${progress}%`;
        }
        if (progress >= 100) {
          clearInterval(timer);
          onClose();
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
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
  );
}