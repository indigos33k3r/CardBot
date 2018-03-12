@echo off
echo Checking versions...
echo If you do not see 2 lines of numbers, install Git Bash and Node.js
git -v
npm -v

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
