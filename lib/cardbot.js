const Discord = require('discord.js');
const client = new Discord.Client();
const CommandHandler = require('./commands/CommandHandler.js');
const Settings = require('./config/settings.json');

client.on('ready', () => {
  console.log('CardBot Initiated');
  client.setGame("c.help | CardBot.com")
});

client.on('message', (message) => {
  if(!message.contents.startsWith(Settings.prefix) return;
  if(message.author.bot) return;
  
  let args = message.contents.slice(Settings.prefix.length).split(" ").slice(1);
  
  if(!CommandHandler.find(message.contents.slice(Settings.prefix.length).split(" ")[0])) return;
  var com = CommandHandler.get(message.contents.slice(Settings.prefix.length).split(" ")[0]);
  com.run(client, message, args, Settings);
});

client.on('error', (err) => {
  console.log(err)
});

client.login(Settings.token);
