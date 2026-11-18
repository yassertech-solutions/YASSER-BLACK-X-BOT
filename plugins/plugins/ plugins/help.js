
const settings = require("../settings");

async function helpCommand(sock, from, msg) {
  const help = `
╔══════════════════════════╗
       🖤 YASSER BLACK X
╚══════════════════════════╝

       ⚡ HELP CENTER ⚡

🤖 BOT COMMANDS

• .menu
• .ping
• .alive
• .help
• .owner

━━━━━━━━━━━━━━━━━━━━

📌 PREFIX: ${settings.prefix}

👑 DEVELOPER: ${settings.ownerName}

⚡ VERSION: ${settings.version}

━━━━━━━━━━━━━━━━━━━━
POWERED BY YASSER TECH
`;

  await sock.sendMessage(from, {
    text: help
  }, { quoted: msg });
}

module.exports = helpCommand;
