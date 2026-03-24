const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function sendMessage(chatId, text, parseMode = "HTML") {
    await fetch(`${TELEGRAM_API}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text, parse_mode: parseMode }),
        });
  }

async function handleCommand(text, chatId) {
    const cmd = text.toLowerCase().trim();
    if (cmd === "/start") {
          return `<b>Bienvenue sur Lokia Sales Bot!</b>\n\nCommandes :\n/status - Statut campagnes\n/stats - Statistiques\n/campagne - Nouvelle campagne\n/prospects - Derniers prospects\n/aide - Aide`;
        }
    if (cmd === "/aide" || cmd === "/help") {
          return `<b>Aide Lokia Sales Bot</b>\n\n/status - Statut\n/stats - Stats\n/campagne - Campagne\n/prospects - Prospects`;
        }
    if (cmd === "/status") {
          return `<b>Statut Lokia Sales</b>\n\nSequence: comptables\nContacts: 24\nEmails: 179\nStatut: Active`;
        }
    if (cmd === "/stats") {
          return `<b>Stats Comptables</b>\n\nEnvoyes: 179\nOuverts: 12 (6.7%)\nRepondus: 12 (6.7%)\nDemos: 1`;
        }
    if (cmd.startsWith("/campagne")) {
          return `<b>Campagne</b>\n\nPrecise: secteur, nombre, message\nEx: /campagne comptables 50`;
        }
    if (cmd === "/prospects") {
          return `<b>Derniers prospects</b>\n\n24 contacts dans la sequence comptables.`;
        }
    return `<b>Message recu!</b>\n\n"${text}"\n\nUtilise /aide pour les commandes.`;
  }

export async function POST(request) {
    try {
          const body = await request.json();
          const message = body.message;
          if (!message || !message.text) return new Response("OK", { status: 200 });
          const chatId = String(message.chat.id);
          const text = message.text;
          if (chatId !== CHAT_ID) return new Response("OK", { status: 200 });
          const response = await handleCommand(text, chatId);
          await sendMessage(chatId, response);
          return new Response("OK", { status: 200 });
        } catch (error) {
          console.error("Webhook error:", error);
          return new Response("Error", { status: 500 });
        }
  }

export async function GET() {
    return new Response(JSON.stringify({ status: "running" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
  }
