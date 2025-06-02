import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SWIPE_THRESHOLD = 50;
const AUTOCHANGE_INTERVAL = 5000;

export default function FullscreenMediaModal({ media, initialIndex, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const timerRef = useRef(null);
  const touchStartY = useRef(0);
  const touchDeltaY = useRef(0);

  useEffect(() => {
    const timeout = setTimeout(() => setShowHint(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % media.length);
    }, AUTOCHANGE_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [media.length]);

  useEffect(() => {
    let start = Date.now();
    const loop = () => {
      const delta = Date.now() - start;
      setProgress((delta % AUTOCHANGE_INTERVAL) / AUTOCHANGE_INTERVAL);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }, []);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchDeltaY.current = e.touches[0].clientY - touchStartY.current;
  };

  const handleTouchEnd = () => {
    if (touchDeltaY.current > SWIPE_THRESHOLD) onClose();
    touchDeltaY.current = 0;
  };

  const current = media[index];

  return (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Задний фон — текущая фотка/видео, затемнённая */}
      <div className="absolute inset-0 z-0">
        {current.type === "image" ? (
          <img
            src={current.src}
            alt="background"
            className="w-full h-full object-cover opacity-20 blur-md"
          />
        ) : (
          <video
            src={current.src}
            className="w-full h-full object-cover opacity-20 blur-md"
            autoPlay
            muted
            loop
            playsInline
          />
        )}
      </div>

      {/* Основной контент сверху */}
      <div
        className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hint */}
        {showHint && (
          <div className="absolute top-5 inset-x-0 text-center text-white/70 text-sm animate-fadeIn z-20">
            Свайп вниз, чтобы закрыть
          </div>
        )}

        {/* Counter */}
        <div className="absolute top-5 right-5 text-white text-sm z-20">
          {index + 1} / {media.length}
        </div>

        {/* Media preview */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl z-20">
          {current.type === "image" ? (
            <img
              src={current.src}
              alt="preview"
              className="w-full h-full object-contain"
            />
          ) : (
            <video
              src={current.src}
              poster={current.poster}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          )}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/20 rounded z-20">
          <div
            className="h-full bg-white rounded"
            style={{ width: `${progress * 100}%`, transition: "width 100ms linear" }}
          />
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {media.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === index ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Tap zones */}
        <div className="absolute inset-0 flex z-30">
          <div
            className="w-1/2 h-full"
            onClick={() => setIndex((prev) => (prev - 1 + media.length) % media.length)}
          />
          <div
            className="w-1/2 h-full"
            onClick={() => setIndex((prev) => (prev + 1) % media.length)}
          />
        </div>
      </div>
    </motion.div>
  </AnimatePresence>
);

}
