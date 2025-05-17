import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sendTelegramMessage } from "../utils/sendTelegramMessage";

export default function RegisterModal({ open, onClose, eventTitle }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!open) return null;

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Введите имя";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Введите корректный email";
    if (!form.phone.match(/^(\+7|8)?7\d{9}$/))
      newErrors.phone = "Введите корректный номер (пример: 87011234567)";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    const success = await sendTelegramMessage(form, eventTitle);
    setSubmitting(false);

    if (success) {
      alert("Спасибо за регистрацию! Мы свяжемся с вами.");
      setForm({ name: "", email: "", phone: "" });
      onClose();
    } else {
      alert("Ошибка отправки. Попробуйте снова.");
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md relative text-[#004018]"
      >
        <motion.button
          onClick={onClose}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute top-4 right-4 text-[#999] hover:text-[#004018] text-2xl"
        >
          &times;
        </motion.button>

        <h2 className="text-2xl font-semibold mb-6 text-center">Регистрация на ивент</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "phone"].map((field) => (
            <div key={field}>
              <input
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                placeholder={
                  field === "name" ? "Ваше имя" :
                  field === "email" ? "Email" : "Телефон"
                }
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className={`w-full px-4 py-3 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#004018]/20 ${
                  errors[field] ? "border-red-400" : "border-[#ddd]"
                }`}
              />
              {errors[field] && (
                <p className="text-xs text-red-500 mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-full text-sm transition font-medium ${
              submitting
                ? "bg-[#ccc] text-white cursor-not-allowed"
                : "bg-[#004018] hover:bg-[#003015] text-white"
            }`}
          >
            {submitting ? "Отправка..." : "Отправить заявку"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}