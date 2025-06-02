import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

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
    badge: "New"
  }
];

export default function Shop() {
  return (
    <div className="w-full bg-gradient-to-b from-[#f8f0de] to-[#f2e8d4] py-14 px-4 sm:px-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center mb-12"
      >
        {/* Адаптивный заголовок с линией и брендингом */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 text-[#004018]/80 text-xs sm:text-sm tracking-widest uppercase">
          <span className="w-8 sm:w-12 h-[1px] bg-[#004018]/20" />
          <span className="italic">by</span>
          <span className="font-light">SAVOA</span>
          <span className="w-8 sm:w-12 h-[1px] bg-[#004018]/20" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-light tracking-[.2em] mt-2 sm:mt-4 text-[#004018] uppercase leading-tight">
          The SAVOA Edit
        </h1>

        <p className="text-xs sm:text-sm text-[#004018]/60 italic mt-2 sm:mt-3 max-w-md mx-auto">
          Curated pieces for balance, clarity and daily rituals
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

