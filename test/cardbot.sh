echo -e Fetching cURL data...

curl https://card-bot.github.io/api/cards/all.json | python -c 'import json,sys; result=json.load(sys.stdin); print(result["'cards'"][0])'

echo -e Done
