module.exports.run = async (client, message, args, settings, con) => {
  let msg = '```'
  let array = client.commands.array();
  
  for(var i in array) {
    msg += `**${settings.prefix}${array[i].name}** - _${array[i].usage}_\n`;
  }
  
  await message.author.send(msg);
  message.channel.send("Hey, " + message.author.username + "! I have sent you a list of the commands!");
}

module.exports.help = {
  name: "help",
  usage: "Get a list of the commands"
}
