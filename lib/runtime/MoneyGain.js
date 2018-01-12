const MoneyManager = require('../modules/MoneyManager.js');
class Money extends MoneyManager {}
const money = new Money();

module.exports.run = async (client, message, args, settings, con) => {
  money.establish(con, message.author.id);
  let money_gained = parseInt(money.get()) + (parseInt(message.content.length) / 10) < 100 ? parseInt(money.get()) + (parseInt(message.content.length) / 10): 0;

  money.update(money_gained)
}
