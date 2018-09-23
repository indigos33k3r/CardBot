const lottery = require('../config/lottery.json');
const MoneyManager = require('../modules/MoneyManager.js');
const Money = new MoneyManager();

module.exports.run = async (client, message, args, settings, con) => {
  Money.establish(con, message.author.id);
  
  con.query(`SELECT * FROM userdata WHERE id = '${message.author.id}'`, async (err, rows) => {
    if(rows.length < 1) return message.channel.send("Create an account first!");
    if(parseInt(Money.get()) < args[0]) return message.channel.send("You do not have that much money!");
    
    let msg = await message.channel.send("`Spinning slots...`");
    
    let data = rows[0];
    
    // Number randomizer, used to display lottery "slots"
    let num1 = Math.floor(Math.random() * ((lottery.data.max - 2) - 1 + 1) + 1);
    let num2 = Math.floor(Math.random() * ((lottery.data.max - 2) - 1 + 1) + 1);
    let num3 = Math.floor(Math.random() * ((lottery.data.max - 2) - 1 + 1) + 1);
    
    // Slot results
    let s1 = lottery.data[num1];
    let s2 = lottery.data[num2];
    let s3 = lottery.data[num3];
    
    var money_gained = s1 === s2 && s2 === s3 ? (parseInt(args[0]) * 10): (parseInt(args[0]) * -1);
    
    con.query(`INSERT INTO userdata ('${message.author.id}', '${data.username}', '${data.feature}', '${data.money + money_gained}')`);
    
    msg.delete();
    if(money_gained.toString().startsWith("-")) {
      return message.channel.send("You did not win!") 
    } else {
      return message.channel.send("You won! Congrats!");
    }
    
    await message.channel.send(`\`\`\`${lottery.data[parseInt(num1) - 1].emoji} ${lottery.data[parseInt(num2) - 1].emoji} ${lottery.data[parseInt(num3) - 1].emoji}\n${s1.emoji} ${s2.emoji} ${s3.emoji}\n${lottery.data[parseInt(num1) + 1].emoji} ${lottery.data[parseInt(num2) + 1].emoji} ${lottery.data[parseInt(num3) + 1].emoji}\`\`\``);
    
    Money.update(parseInt(Money.get()) + parseInt(money_gained));
  });
}


module.exports.help = {
    name: "bet (MONEY)",
    usage: "Bets the specified amount of money that you have. If you win, you get 10x the amount you bet."
}
