@echo off
echo Checking versions...
echo If you do not see 2 lines of numbers, install Git Bash and Node.js
git -v
npm -v

echo Creating Directory...
mkdir C:/Users/Public/CardBot
cd C:/Users/Public/CardBot
echo Done!
echo ---

echo Installing dependencies...
git clone https://github.com/ZippyMagician/CardBot.git
echo Installed!
echo ---
echo ---
echo Open a seperate terminal in this folder and use the following 3 commands
echo ---
echo npm install nodemon -g
echo npm install discord.js
echo npm install snekfetch --save
echo Done!
echo ---

echo Press Enter to exit
pause
