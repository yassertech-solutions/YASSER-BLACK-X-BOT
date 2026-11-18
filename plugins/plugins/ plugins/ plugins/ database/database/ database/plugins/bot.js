const baileys = require("@whiskeysockets/baileys");
const makeWASocket = baileys.default;
const {
  useMultiFileAuthState,
  DisconnectReason
} = baileys;

const pino = require("pino");
const settings = require("./settings");

const menu = require("./plugins/menu");
const ping = require("./plugins/ping");
const alive = require("./plugins/alive");
const owner = require("./plugins/owner");
const help = require("./plugins/help");
const stats = require("./plugins/stats");
const time = require("./plugins/time");
const runtime = require("./plugins/runtime");

const commands = {
  menu,
  ping,
  alive,
  owner,
  help,
  stats,
  time,
  runtime
};

async function startBot() {
  const { state, saveCreds } =
    await useMultiFileAuthState("./session");

  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: "silent" }),
    browser: ["YASSER BLACK X BOT", "Chrome", "1.0.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "open") {
      console.log("YASSER BLACK X BOT CONNECTED!");
    }

    if (connection === "close") {
      const statusCode =
        lastDisconnect?.error?.output?.statusCode;

      if (statusCode !== DisconnectReason.loggedOut) {
        console.log("Connection lost. Reconnecting...");
        setTimeout(startBot, 5000);
      } else {
        console.log("Session logged out. Reconnect manually.");
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;

    for (const msg of messages) {
      if (!msg.message || msg.key.fromMe) continue;

      const from = msg.key.remoteJid;
      const body =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        msg.message.imageMessage?.caption ||
        msg.message.videoMessage?.caption ||
        "";

      const prefix = settings.prefix || ".";
      if (!body.startsWith(prefix)) continue;

      const args = body.slice(prefix.length).trim().split(/\s+/);
      const command = (args.shift() || "").toLowerCase();

      if (!commands[command]) continue;

      try {
        await commands[command](sock, from, msg);
      } catch (error) {
        console.error("Command error:", command, error);
        await sock.sendMessage(from, {
          text: "Command failed. Please try again."
        }, { quoted: msg });
      }
    }
  });
}

startBot().catch(console.error);
