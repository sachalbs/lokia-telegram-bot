const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// API endpoint to send messages TO Telegram from external services
// POST /api/send { "message": "Hello!", "secret": "lokia2026" }
export async function POST(request) {
    try {
          const body = await request.json();
          const { message, secret } = body;

          // Simple auth
          if (secret !== "lokia2026") {
                  return new Response(JSON.stringify({ error: "Unauthorized" }), {
                            status: 401,
                            headers: { "Content-Type": "application/json" },
                          });
                }

          if (!message) {
                  return new Response(JSON.stringify({ error: "No message provided" }), {
                            status: 400,
                            headers: { "Content-Type": "application/json" },
                          });
                }

          const res = await fetch(`${TELEGRAM_API}/sendMessage`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                            chat_id: CHAT_ID,
                            text: message,
                            parse_mode: "HTML",
                          }),
                });

          const data = await res.json();

          return new Response(JSON.stringify({ success: true, data }), {
                  status: 200,
                  headers: { "Content-Type": "application/json" },
                });
        } catch (error) {
          return new Response(JSON.stringify({ error: error.message }), {
                  status: 500,
                  headers: { "Content-Type": "application/json" },
                });
        }
  }
