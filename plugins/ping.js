
async function pingCommand(sock, from, msg) {
  const start = Date.now();

  await sock.sendMessage(from, {
    text: "⚡ Testing YASSER BLACK X system..."
  }, { quoted: msg });

  const latency = Date.now() - start;

  await sock.sendMessage(from, {
    text: `
╔══════════════════════════╗
      ⚡ SYSTEM PING
╚══════════════════════════╝

🖤 BOT: YASSER BLACK X

🚀 RESPONSE: ${latency} ms

🟢 STATUS: ONLINE

👑 DEVELOPER: YASSER TECH

━━━━━━━━━━━━━━━━━━━━
       CYBER SYSTEM ACTIVE
━━━━━━━━━━━━━━━━━━━━
`
  });
}

module.exports = pingCommand;
