import { useContext, useMemo, useEffect, useRef, useState } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, CheckCircle } from "lucide-react";

export default function CartPanel({ isOpen, onClose }) {
  const { cartItems, addToCart, decrementItem, removeFromCart, clearCart, handleWhatsAppOrder } = useContext(CartContext);
  const [toast, setToast] = useState(null);
  const panelRef = useRef(null);
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    notes: ""
  });

  const handleSendOrder = () => {
    const { name, address, notes } = formData;

    if (!name.trim() || !address.trim()) {
        showToast("Заполните имя и адрес");
        return;
    }

    const orderLines = cartItems.map((item, i) => {
        return `${i + 1}. ${item.name} — ${item.quantity} шт. × ${item.price}`;
    }).join('\n');

    const total = totalPrice.toLocaleString("ru-RU");

    const message = `🌿 Новый заказ SAVOA\n\n👤 Имя: ${name}\n📍 Адрес: ${address}\n📝 Комментарий: ${notes || "—"}\n\n📦 Товары:\n${orderLines}\n\n💳 Итого: ${total} ₸`;

    const url = `https://wa.me/77760404661?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
    clearCart();
    onClose();
    };


  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const numeric = parseInt(item.price.replace(/[^\d]/g, ""));
      return acc + numeric * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Загружаем сохранённые данные при монтировании
  useEffect(() => {
    const savedForm = localStorage.getItem("savoaUserInfo");
    if (savedForm) {
        try {
        setFormData(JSON.parse(savedForm));
        } catch {}
    }
  }, []);

    // Сохраняем каждый раз при изменении
  useEffect(() => {
    localStorage.setItem("savoaUserInfo", JSON.stringify(formData));
  }, [formData]);

  // Автофокус при открытии и блокировка скролла
  useEffect(() => {
    if (isOpen && panelRef.current) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        panelRef.current.focus();
      }, 200);
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = "hidden"; // блокирует прокрутку фона
    } else {
        document.body.style.overflow = ""; // возвращает прокрутку
    }

    return () => {
        document.body.style.overflow = ""; // на случай размонтирования
    };
    }, [isOpen]);


  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(null), 1600);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [cartItems]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col outline-none"
            tabIndex={-1}
            ref={panelRef}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-[#004018] tracking-wide">
                Корзина
                <span className="ml-2 bg-[#004018] text-white text-xs rounded-full px-2 py-0.5">
                  {cartItems.length}
                </span>
              </h2>
              <button onClick={onClose} className="text-[#004018] hover:text-[#003015]">
                <X size={20} />
              </button>
            </div>

            <div ref={containerRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence>
                {cartItems.length === 0 ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-gray-500 text-center pt-10"
                  >
                    Ваша корзина пуста
                  </motion.p>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="flex gap-3 border-b pb-2"
                    >
                      {item.media?.[0]?.type === "image" && (
                        <img
                          src={item.media[0].src}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover border"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#004018]">{item.name}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => {
                              decrementItem(item.name);
                              showToast("−1 товар");
                            }}
                            className="p-1 rounded-full bg-[#f2e8d4] hover:bg-[#e6dcc5] transition"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => {
                              addToCart(item);
                              showToast("+1 товар");
                            }}
                            className="p-1 rounded-full bg-[#f2e8d4] hover:bg-[#e6dcc5] transition"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-[#004018]">{item.price}</span>
                          <button
                            onClick={() => {
                              removeFromCart(item.name);
                              showToast("Удалено");
                            }}
                            className="text-xs text-red-500 hover:underline"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {cartItems.length > 0 && (
              <div className="px-6 py-4 border-t bg-gradient-to-t from-white to-[#f8f0de]/30">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-between mb-4 text-sm text-[#004018] font-medium"
                >
                  <span>Итого:</span>
                  <motion.span
                    key={totalPrice}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {totalPrice.toLocaleString("ru-RU")} ₸
                  </motion.span>
                </motion.div>

                <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mb-2 w-full px-3 py-2 text-sm border rounded-lg"
                />
                <input
                type="text"
                placeholder="Адрес или район"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mb-2 w-full px-3 py-2 text-sm border rounded-lg"
                />
                <textarea
                placeholder="Комментарий или пожелание"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mb-3 w-full px-3 py-2 text-sm border rounded-lg resize-none"
                />

                <motion.button
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  onClick={handleSendOrder}
                  className="w-full bg-[#004018] text-white py-2 rounded-lg hover:bg-[#003015] transition text-sm font-semibold tracking-wide"
                >
                  Оформить заказ
                </motion.button>

                <button
                  onClick={() => {
                    clearCart();
                    showToast("Корзина очищена");
                  }}
                  className="mt-3 w-full flex items-center justify-center gap-2 text-red-500 text-xs hover:underline"
                >
                  <Trash2 size={14} /> Очистить корзину
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Всплывающее уведомление */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 bg-[#004018] text-white px-4 py-2 rounded-lg shadow-lg text-sm flex items-center gap-2 z-50"
          >
            <CheckCircle size={16} className="text-green-300" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}