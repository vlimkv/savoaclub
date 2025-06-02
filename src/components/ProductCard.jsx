import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCartContext } from "../context/CartContext";

const AUTOCHANGE_INTERVAL = 5000;

function ProductCard({ product }) {
  const { addToCart } = useCartContext();
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const currentMedia = product.media[index];
  const isPng = currentMedia.type === "image" && currentMedia.src.endsWith(".png");

  const containerRef = useRef(null);
  const startX = useRef(0);
  const deltaX = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % product.media.length);
    }, AUTOCHANGE_INTERVAL);
    return () => clearInterval(interval);
  }, [product.media.length]);

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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white/70 backdrop-blur-lg border border-[#004018]/10 rounded-3xl shadow-2xl p-6 flex flex-col hover:shadow-[0_10px_40px_rgba(0,64,24,0.1)] transition-shadow duration-300"
      >
        <div
          ref={containerRef}
          onClick={() => {
            setModalIndex(index);
            setIsModalOpen(true);
          }}
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
        <p className="text-[#004018]/70 font-semibold mb-2 text-center">{product.price}</p>
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

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300">
            {/* Кнопка закрытия */}
            <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-white text-4xl font-light hover:opacity-60 transition"
            >
            &times;
            </button>

            <div className="relative w-full max-w-[92vw] max-h-[92vh] flex items-center justify-center rounded-2xl overflow-hidden bg-black shadow-xl">
            {/* Картинка или видео */}
            {product.media[modalIndex].type === "image" ? (
                <img
                src={product.media[modalIndex].src}
                alt="modal"
                className="w-full h-full object-contain"
                />
            ) : (
                <video
                src={product.media[modalIndex].src}
                poster={product.media[modalIndex].poster}
                className="w-full h-full object-contain"
                autoPlay
                muted={false}
                controls
                playsInline
                />
            )}

            {/* Стрелка влево */}
            <button
                onClick={() =>
                setModalIndex((prev) => (prev - 1 + product.media.length) % product.media.length)
                }
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-md transition"
            >
                &#8592;
            </button>

            {/* Стрелка вправо */}
            <button
                onClick={() => setModalIndex((prev) => (prev + 1) % product.media.length)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-md transition"
            >
                &#8594;
            </button>
            </div>
        </div>
        )}

    </>
  );
}

export default ProductCard;
