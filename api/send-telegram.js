export default async function handler(request, response) {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return response.status(405).json({
            error: "Method not allowed",
        });
    }

    const { message } = request.body ?? {};

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        return response.status(500).json({
            error: "Telegram is not configured",
        });
    }

    if (
        typeof message !== "string" ||
        message.trim().length === 0 ||
        message.length > 4000
    ) {
        return response.status(400).json({
            error: "Invalid message",
        });
    }

    try {
        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            }
        );

        const telegramData = await telegramResponse.json();

        if (!telegramResponse.ok) {
            console.error("Telegram error:", telegramData);

            return response.status(502).json({
                error:
                    telegramData.description ||
                    "Telegram rejected the message",
            });
        }

        return response.status(200).json({
            ok: true,
            telegram: telegramData,
        });
    } catch (error) {
        console.error("Server error:", error);

        return response.status(502).json({
            error: "Could not reach Telegram",
        });
    }
}