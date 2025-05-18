export async function sendPartnerMessage({ name, message }) {
  const TOKEN = import.meta.env.VITE_TELEGRAM_BOT;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT;

  const text = `
🤝 *Заявка на сотрудничество*

👤 *Имя/Бренд:* ${name}
💬 *Сообщение:* ${message}
🕒 ${new Date().toLocaleString("ru-RU")}
`;

  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "Markdown",
    }),
  });

  if (!res.ok) throw new Error("Telegram error");
}