const lottery = require('../config/lottery.json');

module.exports.run = async (client, message, args, settings, con) => {
  con.query(`SELECT * FROM userdata WHERE id = '${message.author.id}'`, (err, rows) => {
    if(rows.length < 1) return message.channel.send("Create an account first!");
    if(rows[0].money < args[0]) return message.channel.send("You do not have that much money!");
    
    let msg = await message.channel.send("`Spinning slots...`");
    
    let data = rows[0];
    
    // Number randomizer, used to display lottery "slots"
    let num1 = Math.floor(Math.random() * ((lottery.data.max - 1) - 0 + 1) + 1);
    let num2 = Math.floor(Math.random() * ((lottery.data.max - 1) - 0 + 1) + 1);
    let num3 = Math.floor(Math.random() * ((lottery.data.max - 1) - 0 + 1) + 1);
    
    // Slot results
    let s1 = lottery.data[num1];
    let s2 = lottery.data[num2];
    let s3 = lottery.data[num3];
    
    var money_gained = s1 === s2 && s2 === s3 ? (parseInt(args[0]) * 10): (parseInt(args[0]) * -1);
    
    con.query(`INSERT INTO userdata ('${message.author.id}', '${data.username}', '${data.feature}', '${data.money + money_gained}');
    
    msg.delete();
    if(money_gained.toString().startsWith("-")) return message.channel.send("You did not win!") else return message.channel.send("You won! Congrats!");
    
    await message.channel.send(`\`\`\`${lottery.data[parseInt(num1) - 1].emoji} ${lottery.data[parseInt(num2) - 1].emoji} ${lottery.data[parseInt(num3) - 1].emoji}\n${s1.emoji} ${s2.emoji} ${s3.emoji}\n${lottery.data[parseInt(num1) + 1].emoji} ${lottery.data[parseInt(num2) + 1].emoji} ${lottery.data[parseInt(num3) + 1].emoji}\`\`\``)
  });
}
