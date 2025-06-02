import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartContext } from "../context/CartContext";

const AUTOCHANGE_INTERVAL = 4000;

function ProductCard({ product }) {
  const { addToCart } = useCartContext();
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const touchEnd = useRef({ x: 0, y: 0 });

  const currentMedia = product.media[index];
  const isPng = currentMedia.type === "image" && currentMedia.src.endsWith(".png");

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % product.media.length);
    }, AUTOCHANGE_INTERVAL);
    return () => clearInterval(timer);
  }, [product.media.length]);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setModalIndex((prev) => (prev + 1) % product.media.length);
    }, AUTOCHANGE_INTERVAL);
  };

  const stopAutoPlay = () => clearInterval(intervalRef.current);

  useEffect(() => {
    if (isModalOpen) {
      startAutoPlay();
      return stopAutoPlay;
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;
    setProgress(0);
    const step = 100 / (AUTOCHANGE_INTERVAL / 100);
    const p = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + step));
    }, 100);
    return () => clearInterval(p);
  }, [modalIndex, isModalOpen]);

  const handleSwipe = () => {
    const dx = touchEnd.current.x - touchStart.current.x;
    const dy = touchEnd.current.y - touchStart.current.y;

    if (Math.abs(dy) > 100 && Math.abs(dy) > Math.abs(dx)) {
      setIsModalOpen(false);
    } else if (dx > 50) {
      setModalIndex((prev) => (prev - 1 + product.media.length) % product.media.length);
    } else if (dx < -50) {
      setModalIndex((prev) => (prev + 1) % product.media.length);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white/70 backdrop-blur-lg border border-[#004018]/10 rounded-3xl shadow-2xl p-6 flex flex-col"
      >
        <div
          onClick={() => {
            setModalIndex(index);
            setIsModalOpen(true);
          }}
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
        </div>

        <div className="flex gap-2 mb-3 justify-center">
          {product.media.map((item, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-8 h-8 overflow-hidden border rounded ${
                index === i ? "border-[#004018]" : "border-transparent opacity-50"
              }`}
            >
              {item.type === "image" ? (
                <img src={item.src} alt={`preview-${i}`} className="w-full h-full object-cover" />
              ) : (
                <video src={item.src} poster={item.poster} className="w-full h-full object-cover" muted />
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

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl max-h-[92vh] rounded-2xl overflow-hidden shadow-xl bg-black flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => {
                touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
              }}
              onTouchEnd={(e) => {
                touchEnd.current = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
                handleSwipe();
              }}
            >
              {/* Прогресс-бар */}
              <div className="absolute top-0 left-0 w-full h-1 bg-white/30">
                <div
                  className="h-full bg-white transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* Контент */}
              {product.media[modalIndex].type === "image" ? (
                <img
                  src={product.media[modalIndex].src}
                  alt="modal"
                  className={`max-h-[90vh] max-w-full object-contain ${
                    product.media[modalIndex].src.endsWith(".png") ? "bg-transparent" : "bg-black"
                  }`}
                />
              ) : (
                <video
                  src={product.media[modalIndex].src}
                  poster={product.media[modalIndex].poster}
                  className="max-h-[90vh] max-w-full object-contain bg-black"
                  autoPlay
                  muted
                  playsInline
                  loop
                />
              )}

              {/* Навигация */}
              <button
                onClick={() => setModalIndex((prev) => (prev - 1 + product.media.length) % product.media.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-md transition"
              >
                &#8592;
              </button>
              <button
                onClick={() => setModalIndex((prev) => (prev + 1) % product.media.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-md transition"
              >
                &#8594;
              </button>

              {/* Точки */}
              <div className="absolute bottom-4 w-full flex justify-center gap-2">
                {product.media.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      modalIndex === i ? "bg-white" : "bg-white/40"
                    }`}
                  ></div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProductCard;