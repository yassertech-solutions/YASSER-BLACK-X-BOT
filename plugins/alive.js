
const settings = require("../settings");

async function aliveCommand(sock, from, msg) {
  const uptime = process.uptime();

  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  const text = `
╔══════════════════════════╗
       🖤 YASSER BLACK X
╚══════════════════════════╝

⚡ SYSTEM STATUS: ONLINE

🤖 BOT: ${settings.botName}
👑 DEVELOPER: ${settings.ownerName}
🚀 VERSION: ${settings.version}

⏱️ UPTIME:
${hours}h ${minutes}m ${seconds}s

🛡️ MODE: ${settings.mode}

━━━━━━━━━━━━━━━━━━━━
  POWERED BY YASSER TECH
━━━━━━━━━━━━━━━━━━━━
`;

  await sock.sendMessage(from, {
    text
  }, { quoted: msg });
}

module.exports = aliveCommand;
