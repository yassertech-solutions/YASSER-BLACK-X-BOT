
const settings = require("../settings");

async function menuCommand(sock, from, msg) {
  const menu = `
╔══════════════════════════╗
       🖤 YASSER BLACK X
╚══════════════════════════╝

  ⚡ WELCOME TO THE DARK ZONE ⚡

┏━━〔 🤖 BOT INFORMATION 〕
┃
┃ 👑 Name: ${settings.botName}
┃ ⚡ Version: ${settings.version}
┃ 🧑‍💻 Developer: ${settings.ownerName}
┃ 🌐 Mode: ${settings.mode}
┃
┗━━━━━━━━━━━━━━━━━━━━

┏━━〔 ⚡ MAIN COMMANDS 〕
┃
┃ • .menu
┃ • .ping
┃ • .alive
┃
┗━━━━━━━━━━━━━━━━━━━━

┏━━〔 🛠️ SETTINGS 〕
┃
┃ • .owner
┃ • .help
┃
┗━━━━━━━━━━━━━━━━━━━━

╔══════════════════════════╗
   POWERED BY YASSER TECH
╚══════════════════════════╝

       ☠️ BLACK CYBER SYSTEM ☠️
`;

  await sock.sendMessage(from, {
    text: menu
  }, { quoted: msg });
}

module.exports = menuCommand;
