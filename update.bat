@echo off

echo Updating...
git clone -b master --single-branch https://github.com/ZippyMagician/CardBot.git

call start /CardBot/Install/nodemon.bat
call start /CardBot/Install/discord.js.bat
call start /CardBot/Install/snekfetch.bat
call start /CardBot/Install/mysql.bat

echo Done!
echo ---

echo Press enter to exit
pause
