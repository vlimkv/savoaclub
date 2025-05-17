export default function Events() {
  const events = [
    {
      title: "Pilates & Matcha",
      date: "22 мая 2025",
      location: "Astana Wellness Studio",
      description: "Утренний пилатес с живой музыкой, матча-баром и ароматерапией.",
    },
    {
      title: "Sunset Yoga на крыше",
      date: "28 мая 2025",
      location: "Sky Garden, Астана",
      description: "Йога на закате с видом на город и живой скрипкой.",
    },
    {
      title: "Pilates & Flowers",
      date: "1 июня 2025",
      location: "Kulanshi Gallery",
      description: "Тренировка и мастер-класс по цветочным композициям.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-center text-[#2f2f2f] mb-12">
        Ближайшие ивенты
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-2 text-[#2f2f2f]">{event.title}</h2>
            <p className="text-sm text-[#777] mb-1">{event.date}</p>
            <p className="text-sm text-[#777] mb-4">{event.location}</p>
            <p className="text-[#4a4a4a] mb-4">{event.description}</p>
            <button className="px-5 py-2 rounded-xl bg-[#bfae97] hover:bg-[#a8957d] text-white font-medium transition-all">
              Записаться
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
