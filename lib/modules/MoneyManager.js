/**

*/
class MoneyManager {
  constructor() {
    this.opts = {};
    this.opts.structure = "object"
    this.opts.con = undefined;
    this.opts.id = undefined;
  }
  
  establish(con, id) {
    this.opts.con = con;
    this.opts.id = id;
  }
  
  update(con=undefined, id=undefined, money=undefined, callback=undefined) {
    let c = this.opts.con !== undefined ? this.opts.con: con;
    let i = this.opts.id !== undefined ? this.opts.id: id;
    let m, co;

    if(this.opts.con && this.opts.id) {m = con; co = id;} else {m = money; let co = callback}

    con.query(`SELECT * FROM userdata WHERE id = '${i}'`, (err, rows) => {
      if(rows.length < 1) return co("Error: ECONNINCORRECT - " + id + " NOT FOUND");
        
      c.query(`INSERT INTO userdata ('${i}', '${rows[0].username}', '${rows[0].feature}', '${m}')`);
      return;
    });
  }
}
