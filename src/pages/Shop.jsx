import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CartPanel from "../components/CartPanel";
import { useCartContext } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    name: "Water Bottle",
    price: "9 000 ₸",
    media: [
      { type: "image", src: "/shop/bottle.png" },
      { type: "video", src: "/shop/bottle-video.MOV", poster: "/shop/bottle-video-poster.jpg" },
      { type: "image", src: "/shop/3dddbde0-d8ae-485d-8790-5bf8edf67881.jpg" }
    ],
    badge: "New"
  }
];

export default function Shop() {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems } = useCartContext();
  const controls = useAnimation();
  const badgeControls = useAnimation();

  useEffect(() => {
    if (cartItems.length > 0) {
      // Прыгающая анимация бейджа
      badgeControls.start({
        scale: [1, 1.4, 0.95, 1],
        transition: { duration: 0.4 },
      });

      // Вибрация (если поддерживается)
      if (typeof window !== "undefined" && "vibrate" in window.navigator) {
        window.navigator.vibrate(30); // вибрация 30мс
      }
    }
  }, [cartItems.length]); 

  // Анимация кнопки корзины при добавлении товара
  useEffect(() => {
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.4, ease: "easeInOut" }
    });
  }, [cartItems.length]);

  return (
    <div className="relative w-full bg-gradient-to-b from-[#f8f0de] to-[#f2e8d4] py-8 px-4 sm:px-6 font-sans">
      {/* Кнопка корзины */}
      <motion.button
        onClick={() => setCartOpen(true)}
        className="fixed top-10 right-5 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-[#004018] text-white rounded-full shadow-xl flex items-center justify-center transition hover:scale-105 active:scale-95"
        animate={controls}
        aria-label="Открыть корзину"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
          <AnimatePresence>
            {cartItems.length > 0 && (
              <motion.span
                key="badge"
                initial={{ scale: 0 }}
                animate={badgeControls}
                exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-2 text-[10px] sm:text-xs bg-red-500 text-white rounded-full px-1.5 sm:px-2 py-0.5 shadow-md"
              >
                {cartItems.length}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      {/* Панель корзины с анимацией */}
      <AnimatePresence>
        {cartOpen && <CartPanel isOpen={cartOpen} onClose={() => setCartOpen(false)} />}
      </AnimatePresence>

      {/* Заголовок блока */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 sm:gap-4 text-[#004018]/80 text-xs sm:text-sm tracking-widest uppercase">
          <span className="w-8 sm:w-12 h-[1px] bg-[#004018]/20" />
          <span className="italic">by</span>
          <span className="font-light">SAVOA</span>
          <span className="w-8 sm:w-12 h-[1px] bg-[#004018]/20" />
        </div>

        {/* <h1 className="text-3xl sm:text-5xl font-light tracking-[.2em] mt-2 sm:mt-4 text-[#004018] uppercase leading-tight">
          The SAVOA Edit
        </h1>

        <p className="text-xs sm:text-sm text-[#004018]/60 italic mt-2 sm:mt-3 max-w-md mx-auto">
          Curated pieces for balance, clarity and daily rituals
        </p> */}
      </motion.div>

      {/* Сетка карточек товаров */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
