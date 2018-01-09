const snekfetch = require('snekfetch');

function getCards(call) {
  snekfetch.get('https://card-bot.github.io/api/cards/all.json')
    .then(r => {
      return call(r.body.cards);
    });
}

module.exports = {
  getCards: getCards
}
