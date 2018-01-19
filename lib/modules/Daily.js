/**
  * Daily Class Constructor, checks if the user gets a daily reward
  * @type {Container<DailyDataStore>}
  * @constructor
  * @param {MySQL} con - MySQL Connection
  * @param {int} user - User ID to check
*/
class Daily {
  constructor(con, user) {
    let res;
    con.query(`SELECT * FROM dailydata WHERE id = '${user}'`, (err, rows) => {
      res = rows[0] !== undefined ? rows[0]: null;
    });
    
    this.CON_RESULT = res !== null ? res: null;
    this.CON = con;
    this.USER_ID = user;
    this.LAST_ONLINE = this.CON_RESULT.last_online !== undefined ? this.CON_RESULT.last_online: null;
    
    this.update = function (sec) {
      let i;     
      this.LAST_ONLINE = sec;
    }
  }
  
  daily() {
    let seconds = new Date().getTime() / 1000;
    if(LAST_ONLINE <= (parseInt(seconds) - 86400)) {
      this.CON.query(`REPLACE INTO dailydata ('${this.USER_ID}', '${seconds}'`);
      this.update(seconds);
      
      return true;
    }
    return false;
  }
}
