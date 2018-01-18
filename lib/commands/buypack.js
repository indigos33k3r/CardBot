const { getCards } = require('../config/cards.js');
const { getAvailableCards } = require('../config/cards.js');
const { getAvailableCardSlots } = require('../config/cards.js');
const MoneyManager = require('../modules/MoneyManager.js');
const Money = new MoneyManager();

module.exports.run = async (client, message, args, settings, con) => {
    Money.establish(con, message.author.id);
    
    getCards(async (cards) => {
      con.query(`SELECT * FROM userdata WHERE id = '${message.author.id}'`, (err, rows) => {
        if(rows.length < 1) return message.channel.send("Please create an account first with `c.create (USERNAME)`!");
        
        let money = parseInt(Money.get());
        if(money >= 150) {
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
          
          getAvailableCards(con, message.author.id, (num) => {
            if(num < 3) return message.channel.send("You do not have enough open slots!");
            
            getAvailableCardSlots(con, message.author.id, (nums) => {
              let insert = `('${message.author.id}', `
              for(var i = 1; i < settings.backpack.max; i++) {
                if((parseInt(i) - 1) === nums[0]) {
                  insert += `'${card.id}', `;
                } else if((parseInt(i) - 1) === nums[1]) {
                  insert += `'${card2.id}', `;
                } else if((parseInt(i) - 1) === nums[2]) {
                  insert += `'${card3.id}', `;
                } else {
                  insert += `'${rows[0]["card" + i]}', `;
                }
              }
              if(nums[2] === (parseInt(settings.backpack.max) - 1)) {
                insert += `'${card3.id}');`;
              } else {
                insert += `'${rows[0]["card" + i]}');`;
              }
              
              con.query(`REPLACE INTO backpack ${insert}`)
              Money.update(parseInt(Money.get()) - 150)
            });
          });
        });
      });
    });
}

module.exports.help = {
    name: "buypack",
    usage: "Buys a pack of 3 random cards!"
}
