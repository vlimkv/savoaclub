export default function PrivacyPolicy() {
  return (
    <section className="w-full min-h-[80vh] bg-[#F8F0DE] flex flex-col items-center justify-center py-14 px-2 font-inter">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-[#004018] text-2xl sm:text-4xl font-bold uppercase tracking-[0.15em] text-center mb-4 sm:mb-7 drop-shadow-sm font-inter select-none">
          политика конфиденциальности
        </h1>
        <div className="flex justify-center mb-10">
          <span className="inline-block h-[2px] w-28 bg-[#004018]/20 rounded-full" />
        </div>
        {/* Main List */}
        <ol className="list-decimal pl-5 pr-1 space-y-9 text-[1.07rem] sm:text-[1.17rem] leading-[1.85] text-[#004018]/90 font-inter">
          <li>
            <span className="block font-semibold text-[#004018] text-lg mb-1">Общие положения</span>
            <p>
              SAVOA Club заботится о безопасности ваших данных. Все личные данные, которые вы оставляете на нашем сайте (имя, телефон, email и др.), используются только для связи с вами и организации ивентов.
            </p>
            <p className="mt-2">
              Мы никогда не передаём ваши контакты или другую информацию третьим лицам. Ваша приватность и доверие для нас на первом месте.
            </p>
          </li>
          <li>
            <span className="block font-semibold text-[#004018] text-lg mb-1">Обработка персональных данных</span>
            <p>
              Оставляя заявку на нашем сайте, вы <span className="text-[#004018] font-semibold">автоматически даёте согласие</span> на обработку своих данных для связи, подтверждения участия, рассылки информации о мероприятиях SAVOA Club и других организационных вопросов.
            </p>
            <p className="mt-2">
              Мы не используем ваши данные для рекламы сторонних компаний и не продаём их.
            </p>
          </li>
          <li>
            <span className="block font-semibold text-[#004018] text-lg mb-1">Возврат билетов</span>
            <p>
              <span className="font-semibold text-[#004018]">Возврат купленных билетов невозможен.</span> Если у вас не получается прийти на ивент, вы всегда можете передать свой билет другому человеку — подруге, сестре или знакомым. Просто предупредите нас об изменении имени участника через любой удобный способ связи.
            </p>
          </li>
          <li>
            <span className="block font-semibold text-[#004018] text-lg mb-1">Безопасность информации</span>
            <p>
              Мы предпринимаем все необходимые меры для защиты ваших данных. Информация хранится в защищённой базе и недоступна третьим лицам.
            </p>
          </li>
          <li>
            <span className="block font-semibold text-[#004018] text-lg mb-1">Контакты</span>
            <p>
              Если у вас возникнут вопросы по обработке персональных данных, напишите нам — мы всегда открыты к диалогу.
            </p>
          </li>
        </ol>
        {/* Agreement Text */}
        <div className="mt-12 mb-7 text-center text-[1.09rem] sm:text-[1.19rem] text-[#004018] font-inter tracking-[0.04em]">
          Используя наш сайт и оставляя свои данные, вы&nbsp;
          <span className="font-semibold text-[#004018]">соглашаетесь с данной политикой конфиденциальности</span>.
        </div>
      </div>
    </section>
  );
}
