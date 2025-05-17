import bottleImg from "../assets/shop/bottle.jpg";

export default function Shop() {
  const product = {
    name: "Savoa Club Bottle",
    price: "7 000 ₸",
    description: `Гидратация на новом уровне. Бутылка из нержавеющей стали объёмом 600 мл с лазерной гравировкой логотипа SAVOA. Поддерживает температуру, герметична, подходит для посудомоечной машины. Упакована в фирменную коробку — идеальна для подарка.`,
    image: bottleImg,
    isNew: true,
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#f8f0de] to-[#f2e8d4] py-16 px-4 sm:px-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md border border-[#004018]/10 rounded-[2rem] shadow-[0_10px_30px_rgba(0,64,24,0.06)] p-6 sm:p-10 flex flex-col md:flex-row gap-8">
        
        {/* Фото с бейджем */}
        <div className="relative w-full md:w-1/2 overflow-hidden rounded-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105 rounded-2xl"
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-[#004018] text-white text-[11px] tracking-wide px-3 py-1 rounded-full shadow-md">
              NEW
            </span>
          )}
        </div>

        {/* Контент */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#004018] mb-3 leading-snug">{product.name}</h2>
            <p className="text-[#004018]/70 font-medium mb-4 text-lg">{product.price}</p>
            <p className="text-sm text-[#004018]/90 leading-relaxed whitespace-pre-line">{product.description}</p>
          </div>

          {/* Кнопка */}
          <div className="mt-6">
            <button className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#004018] text-white hover:bg-[#003015] transition text-sm font-medium shadow-md">
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
