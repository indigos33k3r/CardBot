const snekfetch = require('snekfetch');
//const mysql = require('mysql');

/*
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "cardbot"
});

con.connect((err) => {
  if(err) return new error(err);
  console.log("Established connection to database");
});
*/

/**
 * Gets and returns an array of all cards published
 * @returns {array}
 */
function getCards() {
  snekfetch.get('https://card-bot.github.io/api/cards/all.json')
    .then(r => {
      return r.body.cards;
    });
}

/**
 * Gets an int value with all of the slots available in the users backpack
 * @param {variable} con - The MySQL connection
 * @param {int} id - The ID of the user's backpack
 * @param {function} call - The callback function
 * @returns {int}
 */
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

/**
 * Gets and returns an array of every # for open card slots
 * @param {variable} con - The MySQL connection
 * @param {int} id - The ID of the user's backpack
 * @param {function} call - The callback function
 * @returns {array}
 */
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
