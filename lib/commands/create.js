const error = require('../errors/Error.js');

module.exports.run = async (client, message, args, settings, con) => {
  
  con.query(`SELECT * FROM ud WHERE id = '${message.author.id}'`, (err, rows) => {
    if(err) return new error(err);
    
    let sql;
    
    if(rows.length < 1) {
      if(args.length > 1) return message.channel.send("No spaces allowed in your username!");
      
      sql = `INSERT INTO un (id, username) VALUES ('${message.author.id}', '${args[0]}')`;
    } else {
      return message.channel.send("You already have registered under the profile `" + rows[0].username + "`!");
    }
    
    con.query(sql, console.log)
  });
}
