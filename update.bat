@echo off

echo Updating...
git clone -b master --single-branch https://github.com/ZippyMagician/CardBot.git

call start /CardBot/install/nodemon.bat
call start /CardBot/install/discord.js.bat
call start /CardBot/install/snekfetch.bat
call start /CardBot/install/mysql.bat

echo Done!
echo ---

echo Press enter to exit
pause
