// pages/Shop.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import ConfirmModal from "../components/ConfirmModal";
import bottleImage from "../assets/shop/bottle.jpg";
import bottleThumb from "../assets/shop/bottle.jpg";

export default function Shop() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const products = [
    {
      name: "Savoa club Bottle",
      price: "7 000 ₸",
      description:
        "Гидратация на новом уровне. Бутылка из нержавеющей стали объёмом 600 мл — лаконичный спутник в вашем ритме жизни. Сохраняет холод, подходит для ПММ и упакована в коробку.",
      images: [bottleImage, bottleThumb],
    },
    // Добавьте другие товары при необходимости
  ];

  const handleAdd = (product) => {
    setActiveProduct(product.name);
    setModalOpen(true);
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#f8f0de] to-[#f2e8d4] py-16 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#004018]">
          Магазин <span className="italic">Savoa</span>
        </h1>
        <div className="mt-3 h-[2px] w-12 bg-[#004018]/30 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-md border border-[#004018]/10 rounded-3xl p-6 shadow-md flex flex-col"
          >
            <div className="relative mb-4 overflow-hidden rounded-xl aspect-[4/3]">
              <img
                src={product.images[0]}
                alt={product.name}
                className="object-cover w-full h-full rounded-xl hover:scale-105 transition-transform"
              />
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                New
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#004018] mb-2">
              {product.name}
            </h2>
            <p className="text-[#004018]/70 font-medium mb-1">{product.price}</p>
            <p className="text-sm text-[#004018]/80 mb-6 leading-relaxed">
              {product.description}
            </p>
            <button
              onClick={() => handleAdd(product)}
              className="mt-auto px-5 py-2 rounded-full bg-[#004018] text-white hover:bg-[#003015] transition text-sm font-light"
            >
              В корзину
            </button>
          </motion.div>
        ))}
      </div>

      <ConfirmModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={activeProduct}
      />
    </div>
  );
}