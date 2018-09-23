module.exports.run = async (client, message, args, settings, con) => {
  let msg = '```';
  let array = client.commands.array();
  
  array.forEach(r => {
    msg += `**${settings.prefix}${r.help.name}** - _${r.help.usage}_\n`;
  });
  msg += `Visit ${"https://card-bot.github.io/redirect?q=https://discordbots.org/&p=https://discordapp.com/channels/@me/" + client.id} to find more bots!`
  await message.author.send(msg);
  message.channel.send(`Hey, ${message.author.username}, I have sent you a list of the commands!`);
}

module.exports.help = {
  name: "help",
  usage: "Gets a list of all the commands!"
}
