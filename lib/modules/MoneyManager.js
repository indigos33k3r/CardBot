/**
 * Money managing class
 * @type {Container<MoneyManager>}
 */
class MoneyManager {
  /**
   * Money Manager structure
   * @type {Container<Data, MoneyManager>}
  */
  constructor() {
    this.opts = {};
    this.opts.structure = "object"
    this.opts.con = undefined;
    this.opts.id = undefined;
  }
  
  /**
   * Establishes constant connection to certain user account
   * @param {MySQL} con - MySQL Connection variable
   * @param {string} id - User ID for connection
   * @type {read-only}
  */
  establish(con, id=undefined) {
    this.opts.con = con;
    this.opts.id = id !== undefined ? id: undefined;
  }
  
  /**
   * Updates money for user account
   * @param {MySQL} con - MySQL Connection variable(optional)
   * @param {string} id - User ID for connection(optional)
   * @param {string} money - Amount of money account is getting
   * @param {function} callback - Callback for errors
   * @type {read-only}
  */
  update(con=undefined, id=undefined, money=undefined, callback=undefined) {
    let m, co, c, i;
    if(this.opts.con && !this.opts.id) {c = this.opts.con; i = con; co = money; m = id} else if(this.opts.con && this.opts.id) {i = this.opts.id; c = this.opts.con; m = con; co = id;} else {i = id; c = con; co = callback; m = money;}

    c.query(`SELECT * FROM userdata WHERE id = '${i}'`, (err, rows) => {
      if(rows.length < 1) return co("Error: ECONNINCORRECT - " + id + " NOT FOUND");
        
      c.query(`INSERT INTO userdata ('${i}', '${rows[0].username}', '${rows[0].feature}', '${m}')`);
      return;
    });
  }
  
  /**
   * Updates money for user account
   * @param {MySQL} con - MySQL Connection variable(optional)
   * @param {string} id - User ID for connection(optional)
   * @param {function} callback - Callback for errors
   * @type {Structure<MoneyManager, string>}
   * @returns {string}
  */
  get(con=undefined, id=undefined, callback=undefined) {
    let co, c, i, result;
    if(this.opts.con && !this.opts.id) {c = this.opts.con; i = con; co = money;} else if(this.opts.con && this.opts.id) {i = this.opts.id; c = this.opts.con; co = id;} else {i = id; c = con; co = callback;}
    
    c.query(`SELECT * FROM userdata WHERE id = '${i}'`, (err, rows) => {
      if(rows.length < 1) return co("Error: ECONNINCORRECT - " + id + " NOT FOUND");
      
      result = rows[0].money
    });
    
    return result;
  }
}

module.exports = MoneyManager;
