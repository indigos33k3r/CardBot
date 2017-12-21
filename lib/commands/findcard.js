const snekfetch = require('snekfetch');

module.exports.run = async (client, message, args, settings, con) => {
  if(args.length < 1) return message.channel.send("Provide a card to search for!");
  
  snekfetch.get('https://card-bot.github.io/api/v0/search/' + args.join(" ").replace(/ /g, '_').replace(/_/g, '__').replace(/\!/g, '~q').replace(/\?/g, '~q').replace(/\'/g, '~a').replace(/\"/g, '~q') + '.json')
    .then(r => {
      message.channel.send(`Result: \`\`\`**Name: ** _${r.body.name}_\n**Packs: ** _${r.body.stats.packs.toString()}_\`\`\``));
      message.channel.send({files: [
        {
          attachment: r.body.image,
          name: r.body.name + message.author.id + '.png'
        }
      ]});
    });
}
