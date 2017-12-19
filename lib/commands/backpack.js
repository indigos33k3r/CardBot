module.exports.run = async (client, message, args, settings, con) => {
    con.query(`SELECT * FROM backpack WHERE id = '${message.author.id}'`, (err, rows) => {
      if(rows.length < 1) return message.channel.send("Please create an account first!");
      
      let msg = '```';
      for(var i = 1; i <= 10; i++) {
        msg += rows[0]["card" + i] + '\n'
      }
      msg += '```';
      
      message.channel.send("Here is your inventory:\n" + msg);
    });
}
