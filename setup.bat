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
call start /Install/nodemon.bat
call start /Install/discord.js.bat
call start /Install/snekfetch.bat
call start /Install/mysql.bat
echo Done!
echo ---

echo Closing...
call start /Install/finish.bat
exit
