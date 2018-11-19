@echo off
echo Checking versions...

call start /install/nodemon.bat
call start /install/discord.js.bat
call start /install/snekfetch.bat
call start /install/mysql.bat
echo Done!

echo Closing...
call start /install/finish.bat
exit
