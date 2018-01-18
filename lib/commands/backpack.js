module.exports.run = async (client, message, args, settings, con) => {
  con.query(`SELECT * FROM backpack WHERE id = '${message.author.id}'`, (err, rows) => {
    if(rows.length < 1) return message.channel.send("Please create an account first with `c.create (USERNAME)`!");
      
    let msg = '```';
    for(var i = 1; i <= settings.backpack.max; i++) {
      let r = rows[0]["card" + i] !== '' ? rows[0]["card" + i]: 'Empty';
      msg += r + '\n'
    }
    msg += '```';
      
    message.channel.send("Here is your inventory:\n" + msg);
  });
}

module.exports.help = {
  name: "backpack",
  usage: "Returns with a list of your backpack contents"
}
