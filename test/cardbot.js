class TestClass {
  constructor() {
    this.data = require('../lib/config/settings.json');
  }
  
  testAll() {
    for(var i in this.data) {
      console.log(`${i}: ${this.data[i]}`);
    }
  }
}
const test = new TestClass();

console.log("Test start:");

test.testAll();

console.log("Test successful");

process.exit()
