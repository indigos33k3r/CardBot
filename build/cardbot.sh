echo -e Fetching cURL data...

curl https://card-bot.github.io/api/cards/all.json | python -c 'import json,sys; result=json.load(sys.stdin); print("Fetched data[card name]: " + str(result["'cards'"][0]["'name'"]))'

echo -e Done
