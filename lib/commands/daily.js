const Daily = require('../modules/Daily.js');
class Reward extends Daily {}
const MoneyManager = require('../modules/MoneyManager.js');
class Money extends MoneyManager {};
var money = new Money();

module.exports.run = async (client, message, args, settings, con) => {
  const reward = new Reward(con, message.author.id);
  money.establish(con, message.author.id);
  
  if(reward.daily()) {    
    message.channel.send({embed: {
        "title": "Daily Reward Collected",
        "fields": [
          {
            "name": "💰Current Balance",
            "value": money.get().toString()
          },
          {
            "name": "💰New Balance",
            "value": (parseInt(money.get()) + parseInt(settings.daily_reward)).toString()
          }
        ]
      }
    });
    
    money.update(parseInt(money.get()) + parseInt(settings.daily_reward));
  } else {
    message.channel.send(":x: You already collected your reward for the day!");
  }
}


module.exports.help = {
    name: "daily",
    usage: "Gets your daily reward"
}
