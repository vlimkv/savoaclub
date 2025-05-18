export async function sendTelegramMessage({ name, email, phone, eventName }) {
  const TOKEN = import.meta.env.VITE_TELEGRAM_TOKEN;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  const message = `
📩 *Новая заявка на ивент*

🧘 *Ивент:* ${eventName}
👤 *Имя:* ${name}
📧 *Email:* ${email}
📱 *Телефон:* ${phone}
🕒 *Время:* ${new Date().toLocaleString("ru-RU")}
`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!res.ok) {
      throw new Error("Ошибка отправки сообщения в Telegram");
    }

    return true;
  } catch (error) {
    console.error("Telegram error:", error);
    return false;
  }
}
