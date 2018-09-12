/**
 * Directory class
 * @type {Function}
 * @param {string} path - The path to the folder
 * @param {DiscordCollection} collection - Where the DiscordCollection will be ported
 */

function readdir(path, collection) {
  fs.readdir(`./../${path}`, (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(r => r.split(".")[0] !== "CommandHandler" && r.split(".").pop() === "js");
    if(jsfiles.length <= 0) return console.log("No commands to load!");

    jsfiles.forEach((f, i) => {
      let props = require(`./../${path}${f}`);
      collection.set(props.help.name.split(" ")[0] || props.help.name, props);
    });
  });
  
  return collection;
}

module.exports = readdir;
