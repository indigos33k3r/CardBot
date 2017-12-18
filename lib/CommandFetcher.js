const Discord = require('discord.js');
const fs = require('fs');

module.exports.fetch = function () {
  let commands = new Discord.Collection()
  
  fs.readdir("./commands/", (err, files) => {
    if(err) console.error(err);
    
    let jsfiles = files.filter(r => r.split(".")[0] !== "CommandHandler" && r.split(".").pop() === "js");
    if(jsfiles.length <= 0) return console.log("No commands to load!");
    
    jsfiles.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      commands.set(f, props);
    });
  });
}
