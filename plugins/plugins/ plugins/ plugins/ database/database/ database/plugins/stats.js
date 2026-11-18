
const { getStats } = require("../database/database");
const settings = require("../settings");

async function statsCommand(sock, from, msg) {
  const stats = getStats();

  const text = `
╔══════════════════════════╗
       📊 SYSTEM STATISTICS
╚══════════════════════════╝

🖤 BOT: ${settings.botName}

👥 TOTAL USERS: ${stats.totalUsers}

👥 TOTAL GROUPS: ${stats.totalGroups}

⚡ VERSION: ${settings.version}

🟢 SYSTEM: ACTIVE

━━━━━━━━━━━━━━━━━━━━
👑 POWERED BY YASSER TECH
━━━━━━━━━━━━━━━━━━━━
`;

  await sock.sendMessage(from, {
    text
  }, { quoted: msg });
}

module.exports = statsCommand;
