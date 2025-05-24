export default function Offer() {
  return (
    <section className="w-full min-h-[80vh] bg-[#F8F0DE] flex flex-col items-center justify-center py-14 px-2 font-inter">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-[#004018] text-2xl sm:text-4xl font-bold uppercase tracking-[0.15em] text-center mb-4 sm:mb-7 font-inter select-none">
          публичная оферта
        </h1>
        <div className="flex justify-center mb-10">
          <span className="inline-block h-[2px] w-28 bg-[#004018]/20 rounded-full" />
        </div>
        <ol className="list-decimal pl-5 pr-1 space-y-8 text-[1.07rem] sm:text-[1.17rem] leading-[1.85] text-[#004018]/90 font-inter">
          <li>
            <span className="block font-semibold text-[#004018] text-lg mb-1">Общие положения</span>
            <p>
              Настоящий документ является официальным предложением (публичной офертой) организаторов SAVOA Club любому желающему принять участие в мероприятиях клуба на условиях, указанных ниже.
            </p>
          </li>
          <li>
            <span className="block font-semibold text-[#004018] text-lg mb-1">Предмет оферты</span>
            <p>
              SAVOA Club организует и проводит мероприятия (ивенты), участие в которых возможно только после оформления заявки и подтверждения регистрации.
            </p>
          </li>
          <li>
            <span className="block font-semibold text-[#004018] text-lg mb-1">Регистрация и оплата</span>
            <p>
              Для участия в мероприятии необходимо заполнить заявку на сайте. После получения заявки организатор связывается с вами и предоставляет реквизиты для оплаты. Участие считается подтверждённым только после поступления оплаты и соответствующего уведомления от организатора.
            </p>
          </li>
          <li>
            <span className="block font-semibold text-[#004018] text-lg mb-1">Передача и возврат билета</span>
            <p>
              <span className="font-semibold text-[#004018]">Возврат оплаченного билета невозможен.</span> Если вы не можете прийти, вы вправе передать свой билет другому человеку (например, подруге или родственнице), предварительно уведомив организаторов о смене участника.
            </p>
          </li>
          <li>
            <span className="block font-semibold text-[#004018] text-lg mb-1">Персональные данные</span>
            <p>
              Оставляя заявку, вы даёте согласие на обработку своих персональных данных для целей организации мероприятия и связи. Ваши данные не передаются третьим лицам и не используются для рекламы.
            </p>
          </li>
          <li>
            <span className="block font-semibold text-[#004018] text-lg mb-1">Ответственность</span>
            <p>
              SAVOA Club не несёт ответственности за невозможность участия по причинам, не зависящим от организаторов. Участник несёт ответственность за достоверность предоставленных контактных данных.
            </p>
          </li>
        </ol>
        <div className="mt-12 mb-7 text-center text-[1.09rem] sm:text-[1.19rem] text-[#004018] font-inter tracking-[0.04em]">
          Отправляя заявку на сайте SAVOA Club, вы&nbsp;
          <span className="font-semibold text-[#004018]">принимаете условия данной публичной оферты</span>.
        </div>
      </div>
    </section>
  );
}
