const snekfetch = require('snekfetch');

module.exports.run = async (client, message, args, settings, con) => {
  if(args.length < 1) return message.channel.send("Provide a card to search for!");
  
  let param = args.join(" ").replace(/ /g, '_').replace(/_/g, '__');
  
  snekfetch.get('https://card-bot.github.io/api/v0/search/' + param + '.json')
    .then(r => {
      message.channel.send(`Result: \`\`\`**Name: ** _${r.body.name}_\n**Packs: ** _${r.body.stats.packs.toString()}_\`\`\``));
      message.channel.send({files: [
        {
          attachment: r.body.image,
          name: r.body.name + message.author.id + '.png'
        }
      ]});
    }).catch(e => message.channel.send("I did not find a card with the name `" + param + "`"));
}
