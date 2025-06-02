import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../utils/supabaseClient";

function getMediaUrl(bucket, filename) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
  return data?.publicUrl || "";
}

const SLIDE_DURATION = 3500; 
const FAST_TRANSITION = 0.17;

export default function PastEventBlock() {
  const [mediaIdx, setMediaIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); 
  const [eventMedia, setEventMedia] = useState([]);
  if (!eventMedia.length || mediaIdx >= eventMedia.length) return null;
  const currentMedia = eventMedia[mediaIdx];
  const [partners, setPartners] = useState([]);
  const [eventInfo, setEventInfo] = useState(null);
  const autoSwipeRef = useRef();
  const rafRef = useRef();
  const touchStartX = useRef(null);
  const progressStartTime = useRef(null);
  const progressAtPause = useRef(0);
  const videoRef = useRef(null);
  const justAdvancedRef = useRef(false);


  const getCurrentDuration = () => {
    if (videoRef.current?.duration) return videoRef.current.duration * 1000;
    return SLIDE_DURATION;
  };

  useEffect(() => {
    if (!eventMedia.length) return;
    setProgress(0);
    progressAtPause.current = 0;
    progressStartTime.current = performance.now();
  }, [mediaIdx, eventMedia]);


  useEffect(() => {
    const fetchData = async () => {
      const { data: mediaEvents } = await supabase
        .from("event_media")
        .select("event_id")
        .order("created_at", { ascending: false });

      const { data: partnerEvents } = await supabase
        .from("event_partners")
        .select("event_id")
        .order("created_at", { ascending: false });

      const ids = new Set();
      mediaEvents?.forEach((m) => ids.add(m.event_id));
      partnerEvents?.forEach((p) => ids.add(p.event_id));

      const firstEventId = [...ids][0];
      if (!firstEventId) return;

      const { data: mediaData } = await supabase
        .from("event_media")
        .select("*")
        .eq("event_id", firstEventId);

      const { data: partnersData } = await supabase
        .from("event_partners")
        .select("*")
        .eq("event_id", firstEventId);

      const { data: eventMeta } = await supabase
        .from("events")
        .select("title, date, time, location")
        .eq("id", firstEventId)
        .single(); // берём один

      const mappedMedia = (mediaData || []).map((m) => ({
        ...m,
        type: m.type || (m.filename?.toLowerCase().endsWith(".mp4") ? "video" : "image"),
        src: m.filename ? getMediaUrl("event-media", m.filename) : "",
      }));

      const mappedPartners = (partnersData || []).map((p) => ({
        ...p,
        src: getMediaUrl("event-partners", p.filename),
      }));

      setEventMedia(mappedMedia);
      setPartners(mappedPartners);
      setEventInfo(eventMeta);
    };

    fetchData();
  }, []);

  

  useEffect(() => {
    if (autoSwipeRef.current) clearTimeout(autoSwipeRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    let currentDuration = SLIDE_DURATION;
    if (videoRef.current && videoRef.current.duration) {
      currentDuration = videoRef.current.duration * 1000;
    }

    
    const animate = (now) => {
      if (isPaused) return;
      if (!progressStartTime.current) progressStartTime.current = now;
      const currentDuration = getCurrentDuration();
      const elapsed = now - progressStartTime.current + progressAtPause.current * currentDuration;
      const nextProgress = Math.min(elapsed / currentDuration, 1);

      setProgress(nextProgress);
      if (justAdvancedRef.current) return;

      if (nextProgress >= 1) {
        justAdvancedRef.current = true;
        setDirection(1);
        setMediaIdx((prev) => (prev + 1) % eventMedia.length);
        setTimeout(() => (justAdvancedRef.current = false), 100);
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

  useEffect(() => {
    if (!isPaused && videoRef.current && currentMedia.type === "video") {
      videoRef.current.play().catch(() => {}); // иногда нужно catch
    }
  }, [mediaIdx]);

  const handlePause = () => {
    setIsPaused(true);
    progressAtPause.current = progress;
    if (videoRef.current && !videoRef.current.ended) {
      videoRef.current.pause();
    }

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
    setIsPaused(false);
    setDirection(1);
    setMediaIdx((prev) => (prev + 1) % eventMedia.length);
    setProgress(0);
    progressAtPause.current = 0;
    progressStartTime.current = performance.now();
  };

  useEffect(() => {
    if (!isPaused && videoRef.current && eventMedia[mediaIdx]?.type === "video") {
      videoRef.current.play().catch(() => {});
    }
  }, [mediaIdx]);

  const variants = {
    enter: (direction) => ({
        x: direction > 0 ? 160 : -160,
        opacity: 0,
        scale: 0.98,
        position: "absolute"
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        position: "relative",
        transition: { duration: FAST_TRANSITION, ease: [0.43, 0.13, 0.23, 0.96] }
    },
    exit: (direction) => ({
        x: direction < 0 ? 160 : -160,
        opacity: 0,
        scale: 0.98,
        position: "absolute",
        transition: { duration: FAST_TRANSITION, ease: [0.43, 0.13, 0.23, 0.96] }
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
                relative h-[220px] xs:h-[290px] sm:h-[350px] md:h-[410px] w-full flex items-center justify-center select-none touch-pan-x overflow-hidden
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
                  {eventMedia.map((m, i) => (
                    <div
                      key={`progress-${i}-${m.id || m.filename || i}`}
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
                  key={`media-${mediaIdx}-${currentMedia?.id || currentMedia?.filename || mediaIdx}`}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={direction}
                  className="object-cover w-full h-full max-h-full flex items-center justify-center"
                >
                  {currentMedia.type === "image" ? (
                    <img
                      src={currentMedia.src}
                      alt={currentMedia.alt}
                      className="object-cover w-full h-full"
                      draggable={false}
                    />
                  ) : (
                    <video
                      key={`video-${currentMedia.src}`}
                      ref={videoRef}
                      src={currentMedia.src}
                      className="object-cover w-full h-full"
                      autoPlay
                      muted
                      loop={false}
                      playsInline
                      preload="auto"
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
                {eventMedia.map((m, i) => (
                  <button
                    key={`dot-${i}-${m.id || m.filename || i}`}
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
            <h2 className="text-xl sm:text-2xl font-light tracking-wide mb-1 uppercase" style={{ letterSpacing: "0.12em" }}>
              {eventInfo?.title || "SAVOA Event"}
            </h2>
            <div className="text-xs sm:text-base text-[#5e765a] tracking-wide font-medium mb-4 uppercase" style={{ letterSpacing: "0.16em" }}>
              {eventInfo?.date || "Дата неизвестна"} &middot; {eventInfo?.location || "Локация неизвестна"}
            </div>
            {/* Партнёры — Apple style */}
            <div className="w-full flex justify-center items-center mt-2">
              <div className="grid grid-cols-3 gap-x-5 sm:gap-x-12 w-full max-w-xs sm:max-w-md">
                {partners?.map((p) => (
                  <img
                    key={p.id || p.filename || p.name || index}
                    alt={p.alt || "partner"}
                    src={p.src}
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
        {[mediaIdx - 1, mediaIdx + 1].map(i => {
          const idx = (i + eventMedia.length) % eventMedia.length;
          const m = eventMedia[idx];
          if (m.type === "video") {
            return (
              <video
                key={`preload-${m.id || m.src}`}
                src={m.src}
                preload="auto"
                muted
                playsInline
                tabIndex={-1}
                style={{
                  position: 'absolute',
                  opacity: 0.01,
                  width: 1,
                  height: 1,
                  pointerEvents: 'none',
                  zIndex: -1,
                }}
              />
            );
          }
          return null;
        })}
    </section>
  );
}
