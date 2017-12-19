function query(type, call) {
  con.query(type, (err, rows) => {
    return call(err, rows);
  });
}

module.exports = Class cards {
  constructor(message, con, id) {
    let res = [];
    query(`SELECT * FROM userdata WHERE id = '${id}'`, (err, rows) => {
      if(rows.length < 1) return message.channel.send("You or your opponent do not have any cards!");
      
      res.push(rows[0].card);
    });
    
    return res;
  }
}
