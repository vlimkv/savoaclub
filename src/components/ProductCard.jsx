import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartContext } from "../context/CartContext";

const AUTOCHANGE_INTERVAL = 6000;

function ProductCard({ product }) {
  const { addToCart } = useCartContext();
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hintText, setHintText] = useState("Чтобы выйти, просто проведите вниз ⇅");
  const timerRef = useRef(null);
  const containerRef = useRef({ startX: 0, startY: 0, swipeX: 0, swipeY: 0 });

  const currentMedia = product.media[index];
  const isPng = currentMedia.type === "image" && currentMedia.src.endsWith(".png");

  const handleTouchStart = (e) => {
    containerRef.current.startY = e.touches[0].clientY;
    containerRef.current.startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const deltaY = e.touches[0].clientY - containerRef.current.startY;
    const deltaX = e.touches[0].clientX - containerRef.current.startX;
    containerRef.current.swipeY = deltaY;
    containerRef.current.swipeX = deltaX;
  };

  const handleTouchEnd = () => {
    const { swipeY, swipeX } = containerRef.current;
    if (swipeY > 50) {
      setIsModalOpen(false);
    } else if (swipeX > 50) {
      setModalIndex((prev) => (prev - 1 + product.media.length) % product.media.length);
    } else if (swipeX < -50) {
      setModalIndex((prev) => (prev + 1) % product.media.length);
    }
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      if (window.innerWidth > 768) {
        setHintText("Tap to close ✕");
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % product.media.length);
    }, AUTOCHANGE_INTERVAL);
    return () => clearInterval(interval);
  }, [product.media.length]);

  useEffect(() => {
    if (isModalOpen) {
      let start = Date.now();
      timerRef.current = requestAnimationFrame(function animate() {
        let elapsed = Date.now() - start;
        setProgress(Math.min(elapsed / AUTOCHANGE_INTERVAL, 1));
        if (elapsed < AUTOCHANGE_INTERVAL) {
          timerRef.current = requestAnimationFrame(animate);
        } else {
          setModalIndex((prev) => (prev + 1) % product.media.length);
        }
      });
    }
    return () => cancelAnimationFrame(timerRef.current);
  }, [modalIndex, isModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
            setHintText("Чтобы выйти, просто проведите вниз ⇅");
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

          {product.badge && (
            <span className="absolute top-3 left-3 bg-[#004018] text-white text-xs px-3 py-1 rounded-full shadow">
              {product.badge}
            </span>
          )}

          <span className="absolute bottom-3 right-3 text-white text-xs bg-black/50 px-2 py-1 rounded-full font-light">
            Нажмите, чтобы открыть на весь экран
          </span>
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

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleModalClick}
          >
            <motion.div
              className="absolute top-4 inset-x-0 text-center text-white/80 text-xs pointer-events-none"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {hintText}
            </motion.div>

            <div className="absolute top-4 right-5 text-white text-xs">
              {modalIndex + 1} / {product.media.length}
            </div>

            <div className="absolute top-0 left-0 w-full h-1 bg-white/30">
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            {/* SAVOA логотип на фоне */}
            <img
              src="/logo.svg"
              alt="SAVOA"
              className="absolute opacity-60 w-1/2 max-w-xs bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
            />

            <div className="relative max-w-3xl w-full h-full flex items-center justify-center px-4">
              {product.media[modalIndex].type === "image" ? (
                <img
                  src={product.media[modalIndex].src}
                  alt="modal"
                  className="w-full h-full object-contain"
                />
              ) : (
                <motion.video
                  key={product.media[modalIndex].src}
                  src={product.media[modalIndex].src}
                  poster={product.media[modalIndex].poster}
                  className="w-full h-full object-contain"
                  autoPlay
                  muted
                  playsInline
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
              {product.media.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setModalIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                    modalIndex === i ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex">
              <div
                className="w-1/2 h-full"
                onClick={() =>
                  setModalIndex((prev) => (prev - 1 + product.media.length) % product.media.length)
                }
              />
              <div
                className="w-1/2 h-full"
                onClick={() => setModalIndex((prev) => (prev + 1) % product.media.length)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProductCard;