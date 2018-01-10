const snekfetch = require('snekfetch');

function getCards(call) {
  snekfetch.get('https://card-bot.github.io/api/cards/all.json')
    .then(r => {
      return call(r.body.cards);
    });
}

function getAvailableCards(con, id, call) {
  con.query(`SELECT * FROM backpack WHERE id = '${id}'`, (err, rows) => {
    let count = 0;
    for(var i in rows[0]) {
      if(i === '') {
        count++;
      }
    }
    
    return call(count);
  });
}

function getAvailableCardSlots(con, id, call) {
  con.query(`SELECT * FROM backpack WHERE id = '${id}'`, (err, rows) => {
    let count = [];
    let cr = 0;
    for(var i in rows[0]) {
      if(i === '') {
        count.push(cr);
      }
      cr++;
    }
    
    return call(count);
  });
}

module.exports = {
  getCards: getCards,
  getAvailableCards: getAvailableCards,
  getAvailableCardSlots: getAvailableCardSlots
}
