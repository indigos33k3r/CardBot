const Discord = require('discord.js');
const client = new Discord.Client();
const Settings = require('./config/settings.json');
if(Settings.mysql.server === true || Settings.mysql.server === "true") const mysql = require('mysql');
const error = require('./errors/Error.js');

// Creates MySQL Table connection
if(mysql) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: Settings.mysql.password,
    database: Settings.mysql.database
  });
  
  con.connect((err) => {
    if(err) return new error(err);
    console.log("Established connection to database");
  });
}

let commands = new Discord.Collection();
let runtime = new Discord.Collection();

// Gets all commands in {commands} folder and adds them to a Discord#Collection
fs.readdir("./commands/", (err, files) => {
  if(err) console.error(err);
    
  let jsfiles = files.filter(r => r.split(".")[0] !== "CommandHandler" && r.split(".").pop() === "js");
  if(jsfiles.length <= 0) return console.log("No commands to load!");
    
  jsfiles.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    commands.set(f, props);
  });
});

fs.readdir("./runtime/", (err, files) => {
  if(err) console.error(err);
    
  let jsfiles = files.filter(r => r.split(".")[0] !== "CommandHandler" && r.split(".").pop() === "js");
  if(jsfiles.length <= 0) return console.log("No RunTime to load!");
    
  jsfiles.forEach((f, i) => {
    let props = require(`./runtime/${f}`);
    runtime.set(f, props);
  });
});

client.on('ready', () => {
  console.log(Settings.name + ' Initiated');
  client.setGame(Settings.prefix + 'help | ' + Settings.name + '.com');
});

// Command parse and run, all commands defined in seperate files for faster loading
client.on('message', (message) => {
  if(message.author.bot) return;
  
  let args = message.contents.slice(Settings.prefix.length).split(" ").slice(1);
  
  runtime.array().forEach(r => r.run(client, message, args, Settings, con));
  
  if(!message.contents.startsWith(Settings.prefix)) return;
  
  var com = commands.get(message.contents.slice(Settings.prefix.length).split(" ")[0]);
  if(mysql) {if(com) com.run(client, message, args, Settings, con);} else {if(com) com.run(client, message, args, Settings);}
});

client.on('error', (err) => {
  return new error(err);
});

// Login to Discord
client.login(Settings.token.bot);
