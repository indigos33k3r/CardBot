class MoneyManager {
  constructor() {
    this.opts.structure = "object"
    this.opts.con = undefined;
    this.opts.id = undefined;
  }
  
  establish(con, id) {
    this.opts.con = con;
    this.opts.id = id;
  }
  
  update(con=undefined, id=undefined, money=undefined) {
    return new Promise(function (resolve, reject) {
      let c = this.opts.con !== undefined ? this.opts.con: con;
      let i = this.opts.id !== undefined ? this.opts.id: id;

      if(this.opts.con && this.opts.id) let m = con else let money = money;

      con.query(`SELECT * FROM userdata WHERE id = '${i}'`, (err, rows) => {
        if(rows.length < 1) return reject("Error: ECONNINCORRECT - " + id + " NOT FOUND");
        c.query(`INSERT INTO userdata ('${i}', '${rows[0].username}', '${rows[0].feature}', '${m}')`, reject);
        return resolve(i, rows[0].username, m);
      });
    });
  }
}
