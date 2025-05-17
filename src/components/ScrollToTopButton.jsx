import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 bg-[#004018] text-white p-3 rounded-full shadow-lg hover:bg-[#003015] transition"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    )
  );
}
