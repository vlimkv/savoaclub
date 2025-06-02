import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard"; // путь к твоему компоненту
// Пример product массива (можно импортировать отдельно)
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
