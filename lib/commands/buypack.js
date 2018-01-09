const { getCards } = require('../config/cards.js');
const { getAvailableCards } = require('../config/cards.js');
const { getAvailableCardSlots } = require('../config/cards.js');

module.exports.run = async (client, message, args, settings, con) => {
    getCards(async (cards) => {
      con.query(`SELECT * FROM userdata WHERE id = '${message.author.id}'`, (err, rows) => {
        if(rows.length < 1) return message.channel.send("Please create an account first with `c.create (USERNAME)`!");
        
        let money = parseInt(rows[0].money);
        if(money >= 100) {
          let msg = await message.channel.send("`Choosing cards...`");
          
          let card = cards[Math.floor(Math.random() * ((cards.length - 1) - 0 + 1) + 0];
          let card2 = cards[Math.floor(Math.random() * ((cards.length - 1) - 0 + 1) + 0];
          let card3 = cards[Math.floor(Math.random() * ((cards.length - 1) - 0 + 1) + 0];
          
          msg.delete();
          await message.channel.send({files: [
          {
            attachment: card.image,
            name: `${message.author.id}_card1.png`
          },
          {
            attachment: card2.image,
            name: `${message.author.id}_card2.png`
          },
          {
            attachment: card3.image,
            name: `${message.author.id}_card3.png`
          }
          ]});
          await message.channel.send("Here are your cards!");
        }
        con.query(`SELECT * FROM backpack WHERE id='${message.author.id}'`, (err, rows) => {
          if(rows.length < 1) return message.channel.send("Please create an account first with `c.create (USERNAME)`!");
          
          getAvailableCards(message.author.id, (num) => {
            if(num < 3) return message.channel.send("You do not have enough open slots!");
            
            getAvailableCardSlots(message.author.id, (nums) => {
              let insert = `('${message.author.id}', `
              for(var i = 1; i < settings.backpack.max; i++) {
                if(i === nums[0]) {
                  insert += `'${card.id}', `;
                } else if(i === nums[1]) {
                  insert += `'${card2.id}', `'
                } else if(i === nums[2]) {
                  insert += `'${card3.id}', `
                } else {
                  insert += `'${rows[0]["card" + i]}', `
                }
              }
              if(nums[2] === settings.backpack.max) {
                insert += `'${card3.id}');`;
              } else {
                insert += `'${rows[0]["card" + i]}');`;
              }
              
              con.query(`REPLACE INTO backpack ${insert}`)
              con.query(`SELECT * FROM userdata WHERE id = '${message.author.id}'`, (err, rows) => {
                if(err) return message.channel.send("An error occured");
                
                con.query(`REPLACE INTO userdata ('${message.author.id}', '${rows[0].username}', '${rows[0].feature}', '${parseInt(rows[0].money) - 100}')`);
              });
            });
          });
        });
      });
    });
}
