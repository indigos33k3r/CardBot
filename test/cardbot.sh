echo -e Fetching cURL data...

info=$(curl https://card-bot.github.io/api/cards/all.json)

echo -e <<< "$info" cards
