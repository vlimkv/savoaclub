export async function sendTelegramMessage({ name, email, phone, eventName }) {
  const TOKEN = "7831239921:AAG6-CSuxDIBBVk2dhz_fKcOSUyuNmeefE0";
  const CHAT_ID = "7042937865";

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
