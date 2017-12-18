@echo off
echo Checking versions...
echo If you do not see 2 lines of numbers, install Git Bash and Node.js
git -v
npm -v

echo Creating Directory...
mkdir C:/Users/Public/ZipBot
cd C:/Users/Public/ZipBot
echo Done!
echo \n

echo Installing dependencies...
git clone https://github.com/ZippyMagician/CardBot.git
npm install nodemon -g
npm install discord.js
npm install snekfetch --save
echo Done!
echo \n

echo Press Enter to exit
pause
