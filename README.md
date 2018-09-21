[![Cobinhood](https://i.imgur.com/3eAEQN2.png)](https://cobinhood.com/)

# Cobwolf
An opensource Cobinhood trading bot

NOTICE: This project is still under development, and has no stable working product yet.
Therefore, it is HIGHLY disencouraged to use this bot beside from development.

#### What does it do?

Cobwolf is a cryptocurrency trading bot that currently only supports selling your assets at the best possible price.
It creates a sellorder with the given data in sellbot_config.json and tries to maintain the lowest price while still making profit. It continuously looks at the lowest price in the public orderbook and modifies its sellorder with the specified pricesteps so it becomes the cheapest sellorder. Why? because everyone that wants to buy this asset, will buy yours first.

### Getting started

Installation:
```sh
$ npm install
```

Or build from scratch:
```sh
$ git clone https://github.com/W4G1/cobwolf.git && cd cobwolf/ && npm install
```

Start the sell bot (Modify sellbot_config.json file first!):
```sh
$ npm start
```

### Configuration

sellbot_config.json example:

```json
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

#### sellbot_config.json explained

The config file for selling. It is important to be carefull while modifying it in order to not lose your funds.

| variable | options |
| ------ | ------ |
| trading_pair | A trading pair available on Cobinhood (Examples: ETH-BTC, USDT-BTC etc..).|
| amount | The amount of coin (that you have in your wallet) you want to use to sell (Important: By specifying more than you have in your cobinhood wallet, the bot will crash).|
| minimum_price | The minimum price that the bot will use to sell the asset (E.G. The price at which you bought the asset first).|
| minimum_profit | Simple maths: minimum_price + minimum_profit = Minimum price the bot will sell.|
| price_steps | The steps which the bot will use to change its offer when your current order has been outbidded by someone else (Important: Do not use smaller price steps than the asset supports). |
| bot_speed | The interval of which the bot will check if your bot has been outbidded (Examples: "slow, normal, fast, cobinflood").|
| api_key | The API key for your Cobinhood account (The bot won't run without it). |
