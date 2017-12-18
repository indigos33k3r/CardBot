function ch() {
  this.commands = {}
  
  this.find = function (name) {
    if(!this.commands[name]) return false;
    return true;
  }
  
  this.get = function (name) {
    return this.commands[name];
  }
}

module.exports = new ch();
