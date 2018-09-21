# Cobwolf
An opensource Cobinhood trading bot

NOTICE: This project is still under development, and has no stable working product yet.
Therefore, it is HIGHLY disencouraged to use this bot beside from development.

### Getting started

Installation:
```sh
$ npm install
```

Start the sell bot:
```sh
$ npm run sellbot
```

### Configuration

sellbot_config.json example:

```
{
  "trading_pair": "ETH-BTC",
  "amount": "0.5",
  "minimum_price": "0.077000",
  "minimum_profit": "0.000100",
  "price_steps": "0.000001",
  "bot_speed": "fast",
  "api_key": "API_KEY"
}
```

### sellbot_config.json explained

The config file for selling. It is important to be carefull while modifying it in order to not lose your funds.

| variable | options |
| ------ | ------ |
| trading_pair | A trading pair available on Cobinhood (Examples: ETH-BTC, USDT-BTC etc..).|
| amount | The amount of coin (that you have in your wallet) you want to use to sell (Important: By setting more than you have in your cobinhood wallet, the bot will crash).|
| minimum_price | The minimum price that the bot will use to sell the asset.|
| minimum_profit | Simple maths: minimum_price + minimum_profit = Minimum price the bot will sell.|
| price_steps | The steps which the bot will use to change its offer when your current order has been outbidded by someone else (Important: Do not use smaller price steps than the asset supports). |
| bot_speed | The interval of which the bot will check if your bot has been outbidded (Examples: "slow, normal, fast, cobinflood").|
| api_key | The API key for your Cobinhood account (The bot won't run without it). |
