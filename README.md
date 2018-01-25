# TutorialBot
TutorialBot is a ready to edit, user bot that you can download and change!

## How to use
Go into the `lib/config/settings.json` file and edit all of the required parameters. If you are not using a MySQL Database, then just leave the `mysql` part of the file blank! If you don't know how to make a Discord Bot, then learn it because you probably won't be able to make it if you don't even know the most basic part! (No offense)

_Note: Make sure the token is set to the token of the bot you want to control!_

## How to install
Download the repository, move the contents of the zip file to the folder you want. Open a terminal in that file with
```sh
cd C:\Your\Bot\Path
```
Then, install `node.js`(_obviously_) and use these commands
```sh
npm install discord.js node-opus --save
npm install snekfetch --save
npm install -g nodemon
```
and, if you want mysql, a good tutorial is somewhere in this branch(I don't remember where) and then use
```sh
npm install mysql --save
```

And that is it! Install other modules at your pleasure, and remember, use `run.bat` to run the bot!
