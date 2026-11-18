
const settings = require("../settings");

async function ownerCommand(sock, from, msg) {
  const text = `
╔══════════════════════════╗
       👑 OWNER PANEL
╚══════════════════════════╝

🖤 ${settings.botName}

👑 OWNER: ${settings.ownerName}

⚡ AVAILABLE COMMANDS

• .menu
• .ping
• .alive
• .owner

━━━━━━━━━━━━━━━━━━━━
🔐 OWNER ACCESS PANEL
━━━━━━━━━━━━━━━━━━━━

POWERED BY YASSER TECH
`;

  await sock.sendMessage(from, {
    text
  }, { quoted: msg });
}

module.exports = ownerCommand;
