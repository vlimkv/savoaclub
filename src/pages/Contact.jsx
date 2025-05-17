export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2f2f2f] mb-6">
        Контакты
      </h1>

      <p className="text-[#4a4a4a] text-lg mb-6">
        Мы всегда открыты для сотрудничества, обратной связи и вдохновляющих диалогов. Напиши нам:
      </p>

      <div className="mb-8 space-y-2">
        <p className="text-[#4a4a4a]">
          📧 Почта: <a href="mailto:hello@savoa.club" className="text-[#bfae97] hover:underline">hello@savoa.club</a>
        </p>
        <p className="text-[#4a4a4a]">
          📸 Instagram: <a href="https://instagram.com/savoa.club" target="_blank" className="text-[#bfae97] hover:underline">@savoa.club</a>
        </p>
      </div>

      <form className="bg-white rounded-2xl shadow-lg p-6 text-left space-y-4">
        <div>
          <label className="block text-sm text-[#4a4a4a] mb-1">Имя</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bfae97]"
          />
        </div>
        <div>
          <label className="block text-sm text-[#4a4a4a] mb-1">Сообщение</label>
          <textarea
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#bfae97]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#bfae97] hover:bg-[#a8957d] text-white py-2 rounded-xl transition-all"
        >
          Отправить
        </button>
      </form>
    </div>
  );
}
