
const settings = require("../settings");

async function runtimeCommand(sock, from, msg) {
  const uptime = process.uptime();

  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  const text = `
╔══════════════════════════╗
       ⚡ RUNTIME SYSTEM
╚══════════════════════════╝

🖤 BOT: ${settings.botName}

⏳ ONLINE TIME:

📅 DAYS: ${days}
🕒 HOURS: ${hours}
⏰ MINUTES: ${minutes}
⚡ SECONDS: ${seconds}

🟢 STATUS: RUNNING

━━━━━━━━━━━━━━━━━━━━
POWERED BY YASSER TECH
━━━━━━━━━━━━━━━━━━━━
`;

  await sock.sendMessage(from, {
    text
  }, { quoted: msg });
}

module.exports = runtimeCommand;
