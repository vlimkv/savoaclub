// Полный рефактор с кросс-платформенным fullscreen overlay (iOS-friendly, элегантный фуллскрин, свайп, прогресс)

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartContext } from "../context/CartContext";

const AUTOCHANGE_INTERVAL = 5000;

const products = [
  {
    name: "Savoa Bottle",
    price: "7 000 ₸",
    description:
      "Лаконичная бутылка на 600 мл для баланса и повседневной практики. Сохраняет холод. Герметична. Подходит для посудомойки.",
    media: [
      { type: "image", src: "/shop/bottle.png" },
      { type: "video", src: "/shop/bottle-video.MOV", poster: "/shop/bottle-video-poster.jpg" },
      { type: "image", src: "/shop/3dddbde0-d8ae-485d-8790-5bf8edf67881.jpg" }
    ],
    badge: "New",
  },
];

export function FullscreenOverlay({ mediaList, currentIndex, onClose }) {
  const [index, setIndex] = useState(currentIndex);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const next = () => setIndex((prev) => (prev + 1) % mediaList.length);
  const prev = () => setIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);

  const startAutoplay = () => {
    intervalRef.current = setInterval(next, 5000);
  };

  const stopAutoplay = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const delta = touchEndX.current - touchStartX.current;
    if (delta > 50) prev();
    if (delta < -50) next();
  };

  const current = mediaList[index];

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-4xl z-50"
      >
        ×
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex items-center justify-center"
        >
          {current.type === "image" ? (
            <img
              src={current.src}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <video
              src={current.src}
              autoPlay
              muted
              loop
              playsInline
              poster={current.poster || ""}
              className="max-h-full max-w-full object-contain"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center z-40">
        <div className="flex gap-2 mb-3">
          {mediaList.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === index ? "bg-white scale-110" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        <div className="w-[60%] h-1 bg-white/20 relative">
          <motion.div
            layout
            className="absolute top-0 left-0 h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${((index + 1) / mediaList.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const { addToCart } = useCartContext();
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const current = product.media[index];
  const isPng = current.type === "image" && current.src.endsWith(".png");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % product.media.length);
    }, AUTOCHANGE_INTERVAL);
    return () => clearInterval(interval);
  }, [product.media.length]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white/70 backdrop-blur-lg border border-[#004018]/10 rounded-3xl shadow-2xl p-6 flex flex-col hover:shadow-[0_10px_40px_rgba(0,64,24,0.1)] transition-shadow duration-300"
    >
      <div
        onClick={() => setFullscreen(true)}
        className={`relative w-full mb-4 rounded-xl overflow-hidden ${isPng ? "bg-[#f8f0de]" : ""} flex items-center justify-center h-60 sm:h-72 cursor-pointer`}
      >
        {current.type === "image" ? (
          <img src={current.src} className={`max-h-full max-w-full object-contain ${isPng ? "scale-95" : "w-full h-full object-cover rounded-xl"}`} />
        ) : (
          <video
            src={current.src}
            poster={current.poster || ""}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        )}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#004018] text-white text-xs px-3 py-1 rounded-full shadow">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex gap-2 mb-3 justify-center">
        {product.media.map((item, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-8 h-8 overflow-hidden border rounded ${index === i ? "border-[#004018]" : "border-transparent opacity-50"} transition-all duration-300`}
          >
            {item.type === "image" ? (
              <img src={item.src} className="w-full h-full object-cover" />
            ) : (
              <video src={item.src} poster={item.poster} muted className="w-full h-full object-cover" />
            )}
          </button>
        ))}
      </div>

      <h2 className="text-xl font-light text-[#004018] tracking-wide mb-1 uppercase text-center">
        {product.name}
      </h2>
      <p className="text-[#004018]/70 font-semibold mb-2 text-center">
        {product.price}
      </p>
      <p className="text-sm text-[#004018]/80 mb-5 leading-relaxed text-center italic">
        {product.description}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-auto mx-auto px-6 py-2 rounded-full bg-[#004018] text-white hover:bg-[#003015] transition-all duration-300 text-sm font-light tracking-wider uppercase shadow-md hover:shadow-xl"
      >
        В корзину
      </button>

      <AnimatePresence>
        {fullscreen && (
          <FullscreenOverlay
            mediaList={product.media}
            currentIndex={index}
            onClose={() => setFullscreen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Shop() {
  return (
    <div className="w-full bg-gradient-to-b from-[#f8f0de] to-[#f2e8d4] py-16 px-4 sm:px-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-14"
      >
        <h1 className="text-5xl sm:text-6xl font-light tracking-widest uppercase text-[#004018]">
          SAVOA <span className="italic font-normal">Store</span>
        </h1>
        <div className="mt-3 h-[2px] w-16 bg-[#004018]/30 mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}