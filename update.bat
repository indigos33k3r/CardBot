@echo off

echo Updating...
git clone -b master --single-branch https://github.com/ZippyMagician/CardBot.git

call start /Install/nodemon.bat
call start /Install/discord.js.bat
call start /Install/snekfetch.bat
call start /Install/mysql.bat

echo Done!
echo ---

echo Press enter to exit
pause
