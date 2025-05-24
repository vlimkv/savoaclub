import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const eventMedia = [
  { type: "video", src: "/media/IMG_7967.MOV", alt: "Pilates Video" },
  { type: "video", src: "/media/IMG_8040.MOV", alt: "Pilates Video" },
  { type: "video", src: "/media/IMG_7955.MOV", alt: "Pilates Video" },
  { type: "video", src: "/media/IMG_8146.MOV", alt: "Pilates Video" },
];

const partners = [
  { src: "/partners/cve.svg", alt: "CVE" },
  { src: "/partners/jasylcoffee.png", alt: "Jasyl Coffee" },
  { src: "/partners/sheraton.png", alt: "Sheraton" },
];

const SLIDE_DURATION = 3500; 

export default function PastEventBlock() {
  const [mediaIdx, setMediaIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); 
  const autoSwipeRef = useRef();
  const rafRef = useRef();
  const touchStartX = useRef(null);
  const progressStartTime = useRef(null);
  const progressAtPause = useRef(0);
  const videoRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    progressAtPause.current = 0;
    progressStartTime.current = performance.now();
  }, [mediaIdx]);

  useEffect(() => {
    if (autoSwipeRef.current) clearTimeout(autoSwipeRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const animate = (now) => {
      if (isPaused) return;
      if (!progressStartTime.current) progressStartTime.current = now;
      const elapsed = now - progressStartTime.current + progressAtPause.current * SLIDE_DURATION;
      const nextProgress = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        setDirection(1);
        setMediaIdx((prev) => (prev + 1) % eventMedia.length);
      } else {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    if (!isPaused) {
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused, mediaIdx]);

  const handlePause = () => {
    setIsPaused(true);
    progressAtPause.current = progress;
    if (videoRef.current) videoRef.current.pause();
  };
  const handleResume = () => {
    if (!isPaused) return;
    progressStartTime.current = performance.now();
    setIsPaused(false);
    if (videoRef.current) videoRef.current.play();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    handlePause();
  };
  const handleTouchEnd = (e) => {
    handleResume();
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        setDirection(1);
        setMediaIdx((mediaIdx + 1) % eventMedia.length);
      } else {
        setDirection(-1);
        setMediaIdx((mediaIdx - 1 + eventMedia.length) % eventMedia.length);
      }
    }
  };

  const handleVideoEnd = () => {
    setDirection(1);
    setMediaIdx((mediaIdx + 1) % eventMedia.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.97,
      position: "absolute"
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      position: "relative",
      transition: { duration: 0.34, ease: "easeInOut" }
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.97,
      position: "absolute",
      transition: { duration: 0.34, ease: "easeInOut" }
    })
  };

  return (
    <section className="w-full flex flex-col items-center py-12 sm:py-24 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-[97vw] xs:max-w-md sm:max-w-xl md:max-w-2xl rounded-[2.3rem] bg-[#fcf7ee]/90 shadow-lg border border-[#eddab8]/60 overflow-hidden mx-1 sm:mx-0 backdrop-blur-[3px]"
        style={{
            boxShadow: "0 8px 36px 0 rgba(208,183,142,0.13), 0 2px 8px 0 rgba(180,170,150,0.06)",
        }}
        >
  <div className="relative w-full bg-[#f5f0e4] overflow-hidden">
    <div
      className="
        h-[220px] xs:h-[290px] sm:h-[350px] md:h-[410px] w-full flex items-center justify-center select-none touch-pan-x overflow-hidden
      "
      onMouseDown={handlePause}
      onMouseUp={handleResume}
      onMouseLeave={handleResume}
      onTouchCancel={handleResume}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ position: "relative", zIndex: 1 }}
    >
      {/* Прогресс-бар */}
      <div className="absolute top-0 left-0 w-full z-30 pointer-events-none">
        <div className="w-full h-[2.5px] bg-[#f8f0de]/80 flex rounded-none">
          {eventMedia.map((_, i) => (
            <div
              key={i}
              className="flex-1 relative"
              style={{ marginRight: i !== eventMedia.length - 1 ? 2 : 0 }}
            >
              <div
                className={`absolute left-0 top-0 h-full ${
                  i < mediaIdx
                    ? "bg-[#004018]"
                    : i === mediaIdx
                    ? "bg-[#004018]"
                    : "bg-transparent"
                }`}
                style={{
                  width:
                    i < mediaIdx
                      ? "100%"
                      : i === mediaIdx
                      ? `${Math.round(progress * 100)}%`
                      : "0%",
                  transition: i === mediaIdx ? "width 0.05s linear" : "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Медиа */}
      <AnimatePresence custom={direction} initial={false} mode="wait">
        <motion.div
          key={mediaIdx}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={direction}
          className="w-full h-full flex items-center justify-center"
        >
          {eventMedia[mediaIdx].type === "image" ? (
            <img
              src={eventMedia[mediaIdx].src}
              alt={eventMedia[mediaIdx].alt}
              className="object-cover w-full h-full"
              draggable={false}
            />
          ) : (
            <video
              key={eventMedia[mediaIdx].src}
              ref={videoRef}
              src={eventMedia[mediaIdx].src}
              className="object-cover w-full h-full"
              autoPlay
              muted
              loop={false}
              playsInline
              onEnded={handleVideoEnd}
            />
          )}
        </motion.div>
      </AnimatePresence>
      {/* Градиент */}
      <div
        className="absolute left-0 bottom-0 w-full"
        style={{
          height: "100px",
          background: "linear-gradient(180deg,rgba(252,247,238,0.01) 38%,#f8f0de 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      {/* Точки — z-50 всегда поверх */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {eventMedia.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full border border-[#e8d5b7] ${i === mediaIdx ? "bg-[#004018]/90 scale-125 shadow" : "bg-[#ede4d4]"} transition-all`}
            onClick={() => {
              setDirection(i > mediaIdx ? 1 : -1);
              setMediaIdx(i);
              setProgress(0);
              progressStartTime.current = performance.now();
              progressAtPause.current = 0;
            }}
            aria-label={`Show media ${i + 1}`}
            tabIndex={-1}
          />
        ))}
      </div>
    </div>
  </div>
    <div
    className="w-full sm:px-10 py-8 text-center text-[#004018] flex flex-col items-center bg-[#f8f0de] -mt-1 relative z-10"
    style={{ boxShadow: "0 -1px 40px 0 #f8f0de" }}
  >
    <h2
      className="text-xl sm:text-2xl font-light tracking-wide mb-1 uppercase"
      style={{ letterSpacing: "0.12em" }}
    >
      Pilates & Matcha
    </h2>
    <div className="text-xs sm:text-base text-[#5e765a] tracking-wide font-medium mb-4 uppercase"
      style={{ letterSpacing: "0.16em" }}>
      24 мая 2025 &middot; Sheraton Terrace
    </div>
    {/* Партнёры — Apple style */}
    <div className="w-full flex justify-center items-center mt-2">
  <div className="grid grid-cols-3 gap-x-5 sm:gap-x-12 w-full max-w-xs sm:max-w-md">
    {partners.map((p) => (
      <img
        key={p.alt}
        src={p.src}
        alt={p.alt}
        className="
          h-10 sm:h-14 w-full object-contain
          transition-all
        "
        style={{
          minWidth: 0,           // предотвращает переполнение
          maxHeight: "56px",     // одинаковая высота (sm: 56px)
          filter: "grayscale(0.08) brightness(0.97)",
        }}
      />
    ))}
  </div>
</div>

  </div>

</motion.div>

    </section>
  );
}
