@echo off
cd CardBot

node -v
npm run build:card
echo ---Executing---
npm run start
