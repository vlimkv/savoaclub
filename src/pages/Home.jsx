export default function Home() {
  return (
    <div className="flex flex-col items-center text-center py-24 px-4">
      <h1 className="text-5xl md:text-6xl font-serif font-extrabold text-[#2f2f2f] mb-6 tracking-tight">
        Savoa Club
      </h1>
      
      <p className="text-lg md:text-xl text-[#4a4a4a] max-w-2xl mb-8 leading-relaxed">
        Пространство женской энергии, внутренней гармонии и эстетики. Мы объединяем женщин через ивенты, движение, вдохновение и заботу.
      </p>

      <button className="mt-4 px-8 py-3 rounded-xl bg-[#bfae97] hover:bg-[#a8957d] text-white font-medium shadow-lg transition-all duration-300">
        Записаться на ближайший ивент
      </button>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Pilates & Matcha</h3>
          <p className="text-sm text-[#4a4a4a]">
            Утренние занятия с матча-сетом, музыкой и спокойствием.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Sunset Yoga</h3>
          <p className="text-sm text-[#4a4a4a]">
            Йога на закате с видом на город и живой скрипкой.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Wellness Ретриты</h3>
          <p className="text-sm text-[#4a4a4a]">
            Медитации, питание, мастер-классы и женское community.
          </p>
        </div>
      </div>
    </div>
  );
}
