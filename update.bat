@echo off
cd C:/Users/Public/CardBot

echo Updating...
git clone https://github.com/ZippyMagician/CardBot.git

call start C:/Users/Public/CardBot/Install/nodemon.bat
call start C:/Users/Public/CardBot/Install/discord.js.bat
call start C:/Users/Public/CardBot/Install/snekfetch.bat
call start C:/Users/Public/CardBot/Install/mysql.bat

echo Done!
echo ---

echo Press enter to exit
pause
