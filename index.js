
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const P = require("pino");
const fs = require("fs");
const path = require("path");

const CONFIG = {
  botName: "YASSER BLACK X",
  ownerName: "YASSER TECH",
  prefix: ".",
  version: "1.0.0"
};

async function startBot() {
  console.log(`
╔════════════════════════════════╗
║       YASSER BLACK X BOT       ║
║       CYBER SYSTEM ONLINE      ║
╚════════════════════════════════╝
  `);

  const { state, saveCreds } =
    await useMultiFileAuthState("session");

  const sock = makeWASocket({
    auth: state,
    logger: P({ level: "silent" }),
    browser: ["YASSER BLACK X", "Chrome", "1.0.0"],
    printQRInTerminal: false,
    markOnlineOnConnect: false
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("QR generated. Configure pairing through a secure setup.");
    }

    if (connection === "open") {
      console.log("✅ YASSER BLACK X CONNECTED!");
    }

    if (connection === "close") {
      const statusCode =
        lastDisconnect?.error?.output?.statusCode;

      if (statusCode !== DisconnectReason.loggedOut) {
        console.log("Connection closed. Reconnecting...");
        startBot();
      } else {
        console.log("Session logged out. Re-authentication required.");
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;

    for (const msg of messages) {
      if (!msg.message || msg.key.fromMe) continue;

      const from = msg.key.remoteJid;

      if (from === "status@broadcast") continue;

      const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        "";

      if (!text.startsWith(CONFIG.prefix)) continue;

      const args = text.trim().slice(1).split(/\s+/);
      const command = args.shift()?.toLowerCase();

      try {
        switch (command) {
          case "ping":
            await sock.sendMessage(from, {
              text: "⚡ PONG!\nYASSER BLACK X IS ONLINE."
            }, { quoted: msg });
            break;

          case "alive":
            await sock.sendMessage(from, {
              text:
                `🖤 ${CONFIG.botName}\n` +
                `⚡ Version: ${CONFIG.version}\n` +
                `👑 Developer: ${CONFIG.ownerName}\n` +
                `🟢 Status: ONLINE`
            }, { quoted: msg });
            break;

          case "menu":
            await sock.sendMessage(from, {
              text:
                `╔══『 ${CONFIG.botName} 』══╗\n\n` +
                `⚡ .ping\n` +
                `🤖 .alive\n` +
                `📜 .menu\n\n` +
                `╚══ POWERED BY YASSER TECH ══╝`
            }, { quoted: msg });
            break;

          default:
            await sock.sendMessage(from, {
              text: "❌ Unknown command. Type .menu"
            }, { quoted: msg });
        }
      } catch (error) {
        console.error("Command error:", error);
      }
    }
  });
}

startBot().catch(console.error);
