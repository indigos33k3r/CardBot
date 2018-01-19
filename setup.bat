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
call start C:/Users/Public/CardBot/Install/nodemon.bat
call start C:/Users/Public/CardBot/Install/discord.js.bat
call start C:/Users/Public/CardBot/Install/snekfetch.bat
call start C:/Users/Public/CardBot/Install/mysql.bat
echo Done!
echo ---

echo Closing...
call start C:/Users/Public/CardBot/Install/finish.bat
exit
