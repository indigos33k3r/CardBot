const error = require('../errors/Error.js');

module.exports.run = async (client, message, args, settings, con) => {
  
  con.query(`SELECT * FROM userdata WHERE id = '${message.author.id}'`, (err, rows) => {
    if(err) return new error(err);
    
    let sql;
    
    if(rows.length < 1) {
      if(args.length > 1) return message.channel.send("No spaces allowed in your username!");
      
      sql = `INSERT INTO userdata (id, username, feature, money) VALUES ('${message.author.id}', '${args[0]}', '', '100')`;
    } else {
      return message.channel.send("You already have registered under the profile `" + rows[0].username + "`!");
    }
    let carddat = '(id, ';
    for(var i = 1; i < settings.backpack.max; i++) {
      carddat += 'card' + i + ', ';
    }
    carddat += 'card' + settings.backpack.max + ')';
    
    let cardvalue = `(${message.author.id}, `;
    for(var i = 1; i < settings.backpack.max; i++) {
      cardvalue += '\'\', ';
    }
    cardvalue += '\'\')';
    
    con.query(sql, console.log)
    con.query(`INSERT INTO backpack ${carddat} VALUES ${cardvalue}`, console.log);
    message.channel.send("Your account has been created. You have been given `$100`.");
  });
}
