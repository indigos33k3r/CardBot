@echo off
echo Checking versions...

echo Installing dependencies...
git clone -b master --single-branch https://github.com/ZippyMagician/CardBot.git CardBot
cd CardBot
echo Installed!
echo ---
call start /install/nodemon.bat
call start /install/discord.js.bat
call start /install/snekfetch.bat
call start /install/mysql.bat
echo Done!
echo ---

echo Closing...
call start /install/finish.bat
exit
