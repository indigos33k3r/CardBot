module.exports.run = () => {
  let start = 'CREATE TABLE backpack ('
  
  for(var i = 1; i < require('../lib/config/config.json').backpack.max; i++) {
    start += `card${i} VARCHAR(100) NOT NULL, `;
  }
  start += `card${require('../lib/config/config.json').backpack.max});`;
  
  return start;
}
