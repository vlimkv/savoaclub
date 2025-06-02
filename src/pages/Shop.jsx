import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCartContext } from "../context/CartContext";

const AUTOCHANGE_INTERVAL = 5000;

const products = [
  {
    name: "Savoa Bottle",
    price: "7 000 ₸",
    description:
      "Лаконичная бутылка на 600 мл для баланса и повседневной практики. Сохраняет холод. Герметична. Подходит для посудомойки.",
    media: [
      { type: "image", src: "src/assets/shop/bottle.png" },
      { type: "video", src: "src/assets/shop/bottle-video.mov", poster: "src/assets/shop/bottle-video-poster.jpg" },
      { type: "image", src: "src/assets/shop/3dddbde0-d8ae-485d-8790-5bf8edf67881.jpg" }
    ],
    badge: "New",
  },
];

function ProductCard({ product }) {
  const { addToCart } = useCartContext();
  const [index, setIndex] = useState(0);
  const currentMedia = product.media[index];
  const isPng = currentMedia.type === "image" && currentMedia.src.endsWith(".png");

  const containerRef = useRef(null);
  const startX = useRef(0);
  const deltaX = useRef(0);

  // Автосмена каждые 5 сек
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % product.media.length);
    }, AUTOCHANGE_INTERVAL);
    return () => clearInterval(interval);
  }, [product.media.length]);

  // Swipe обработка
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    deltaX.current = e.touches[0].clientX - startX.current;
  };

  const handleTouchEnd = () => {
    if (deltaX.current > 50) {
      setIndex((prev) => (prev - 1 + product.media.length) % product.media.length);
    } else if (deltaX.current < -50) {
      setIndex((prev) => (prev + 1) % product.media.length);
    }
    deltaX.current = 0;
  };

  // Fullscreen при клике
  const openFullscreen = () => {
    const el = containerRef.current;
    if (el?.requestFullscreen) el.requestFullscreen();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white/70 backdrop-blur-lg border border-[#004018]/10 rounded-3xl shadow-2xl p-6 flex flex-col hover:shadow-[0_10px_40px_rgba(0,64,24,0.1)] transition-shadow duration-300"
    >
      <div
        ref={containerRef}
        onClick={openFullscreen}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full mb-4 rounded-xl overflow-hidden ${
          isPng ? "bg-[#f8f0de]" : ""
        } flex items-center justify-center h-60 sm:h-72 cursor-pointer`}
      >
        {currentMedia.type === "image" ? (
          <img
            src={currentMedia.src}
            alt={product.name}
            className={`max-h-full max-w-full object-contain transition-all duration-500 ${
              isPng ? "scale-95" : "w-full h-full object-cover rounded-xl"
            }`}
          />
        ) : (
          <video
            src={currentMedia.src}
            poster={currentMedia.poster || ""}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
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
            className={`w-8 h-8 overflow-hidden border rounded ${
              index === i ? "border-[#004018]" : "border-transparent opacity-50"
            } transition-all duration-300`}
          >
            {item.type === "image" ? (
              <img src={item.src} alt={`preview-${i}`} className="w-full h-full object-cover" />
            ) : (
              <video
                src={item.src}
                poster={item.poster}
                className="w-full h-full object-cover"
                muted
              />
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