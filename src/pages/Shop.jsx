export default function Shop() {
  const products = [
    {
      name: "Арома-свеча 'Тишина'",
      price: "6 900 ₸",
      description: "Свеча ручной работы с ароматом лаванды, ванили и белого чая.",
    },
    {
      name: "Бутылка Savoa Club",
      price: "4 500 ₸",
      description: "Стеклянная бутылка с надписью 'breathe & move'. Идеальна для йоги.",
    },
    {
      name: "Худи 'Soft Energy'",
      price: "14 900 ₸",
      description: "Оверсайз худи кремового цвета с вышивкой и мягким флисом внутри.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-center text-[#2f2f2f] mb-12">
        Магазин Savoa
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-[#2f2f2f] mb-2">{product.name}</h2>
            <p className="text-[#bfae97] font-bold mb-1">{product.price}</p>
            <p className="text-sm text-[#4a4a4a] mb-4">{product.description}</p>
            <button className="px-5 py-2 rounded-xl bg-[#bfae97] hover:bg-[#a8957d] text-white font-medium transition-all">
              В корзину
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
