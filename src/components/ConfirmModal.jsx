// components/ConfirmModal.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({ open, onClose, productName }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl"
        >
          <h2 className="text-lg font-semibold text-[#004018] mb-2">Добавлено в корзину</h2>
          <p className="text-sm text-[#004018]/80 mb-4">{productName} теперь в вашей корзине.</p>
          <button
            onClick={onClose}
            className="mt-2 px-6 py-2 bg-[#004018] text-white rounded-full hover:bg-[#003015] transition text-sm"
          >
            Продолжить
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}