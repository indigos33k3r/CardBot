module.exports.run = async (client, message, args, settings, con) => {
  let msg = '```';
  let array = client.commands.array();
  
  array.forEach(r => {
    msg += `**${settings.prefix}${r.name}** - _${r.usage}_`;
  });
  
  await message.author.send(msg);
  message.channel.send(`Hey, ${message.author.username}, I have sent you a list of the commands!`);
}

module.exports.help = {
  name: "help",
  usage: "Gets a list of all the commands!"
}
