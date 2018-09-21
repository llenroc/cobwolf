// CobWolf - Opensource Cobinhood Trading Bot
const color = require('chalk');
const fs = require('fs');

var configData = fs.readFileSync('sellbot_config.json', 'utf8')
const config = JSON.parse(configData);

const config_tradingPair = config.trading_pair;
const config_amount = parseFloat(config.amount);
const config_basePair = config.trading_pair.split('-')[1];
const config_quotePair = config.trading_pair.split('-')[0];
const config_minPrice = parseFloat(config.minimum_price);
const config_minProfit = parseFloat(config.minimum_profit);
const config_priceSteps = parseFloat(config.price_steps);
const config_botSpeed = config.bot_speed;
const config_apiKey = config.api_key;

//#####################################################################################
//#####################################################################################
//#####################################################################################
//#####################################################################################
//#####################################################################################

const Client = require('node-cobinhood');
let client = new Client({
    key: config_apiKey
});

/*
function bot_placeOrder() {

    bot.placeLimitOrder(config_tradingPair, 'bid', price, config_amount);
}*/

function bot_modifyOrder() {

    let currentOrders_get = client.listOrders();
    let currentOrders_data = Promise.resolve(currentOrders_get);

    currentOrders_data.then(function (currentOrders) { // Get Own (Active/Pending) Orders

        let order_id = currentOrders.orders[0].id;
        let order_price = parseFloat(currentOrders.orders[0].price);
        let order_amount = parseFloat(currentOrders.orders[0].size);
        let order_filled = parseFloat(currentOrders.orders[0].filled);
        let order_side = currentOrders.orders[0].side;
        let order_tradingPair = currentOrders.orders[0].tradingPair;
        let order_basePair = order_tradingPair.split('-')[1];
        let order_quotePair = order_tradingPair.split('-')[0];

        let marketOrderbook_get = client.getOrderbook(order_tradingPair, '', 2);
        let marketOrderbook_data = Promise.resolve(marketOrderbook_get);

            marketOrderbook_data.then(function (marketOrderbook) { // Get Market Orderbook

                let market_highestBid = parseFloat(marketOrderbook.bids[0].price);
                let market_lowestAsk = parseFloat(marketOrderbook.asks[0].price);
                let market_secondHighestBid = parseFloat(marketOrderbook.bids[1].price);
                let market_secondLowestAsk = parseFloat(marketOrderbook.asks[1].price);
                let market_margin = parseFloat(marketOrderbook.asks[0].price - marketOrderbook.bids[0].price).toFixed(6);
        
                if (order_side === 'ask') {

                    if (parseFloat(config_minPrice + config_minProfit + config_priceSteps).toFixed(6) < market_lowestAsk && market_lowestAsk < order_price) {

                        let order_newPrice = parseFloat(market_lowestAsk - config_priceSteps).toFixed(6);
                        let order_estimatedProfit = parseFloat(order_newPrice * order_amount - config_minPrice * order_amount).toFixed(6);

                        client.modifyOrder(order_id, config_tradingPair, order_newPrice, order_amount);

                        console.log('\033c');
                        //------------------------------------------------------
                        console.log(color.bgHex('#292929')
                        ('                                                       '));
                        console.log(color.bgHex('#292929').hex('#C0C0C0')
                        ('  Bot: ') +
                        color.bgHex('#292929').hex('#9ACD32')
                        ('ACTIVE') +
                        color.bgHex('#292929').hex('#C0C0C0')
                        ('   Last Status: ') +
                        color.bgHex('#292929').hex('#BA55D3')
                        ('[▼] RECAPTURING POSITION  '));
                        console.log(color.bgHex('#292929')
                        ('                                                       '));
                        //------------------------------------------------------


                        //------------------------------------------------------
                        console.log(' ');
                        console.log(color.hex('#1E90FF')('█'));
                        console.log(color.hex('#1E90FF')
                        ('█   ' + order_tradingPair + ' Market:'));
                        console.log(color.hex('#1E90FF')('█   '));
                        //------------------------------------------------------
                        console.log(color.hex('#1E90FF')('█   ') +
                        color.hex('#9ACD32')('▲') +
                        color.hex('#808080')(' Highest Bid Price:           ') +
                        color.hex('#FFFFFF')(market_highestBid + ' ') +
                        color.hex('#C0C0C0')(order_basePair));
                        //------------------------------------------------------
                        console.log(color.hex('#1E90FF')('█   ') +
                        color.hex('#C0C0C0')('÷') +
                        color.hex('#808080')(' Market Margin:               ') +
                        color.hex('#FFFFFF')(market_margin + ' ') +
                        color.hex('#C0C0C0')(order_basePair));
                        //------------------------------------------------------
                        console.log(color.hex('#1E90FF')('█   ') +
                        color.hex('#DC143C')('▼') +
                        color.hex('#808080')(' Lowest Ask Price:            ') +
                        color.hex('#FFFFFF')(market_lowestAsk + ' ') +
                        color.hex('#C0C0C0')(order_basePair));
                        console.log(color.hex('#1E90FF')('█'));
                        //------------------------------------------------------


                        //------------------------------------------------------
                        console.log(' ');
                        console.log(color.hex('#DC143C')('█'));
                        console.log(color.hex('#DC143C')('█   ') +
                        color.hex('#DC143C')
                        ('Sell Order:'));
                        console.log(color.hex('#DC143C')('█'));
                        //------------------------------------------------------
                        console.log(color.hex('#DC143C')('█   ') +
                        color.hex('#C0C0C0')('%') +
                        color.hex('#808080')(' Order Status:                ') +
                        color.hex('#FFFFFF')(parseFloat(order_filled / order_amount * 100).toFixed(2) + ' ') +
                        color.hex('#C0C0C0')('%'));
                        //------------------------------------------------------
                        console.log(color.hex('#DC143C')('█   ') +
                        color.hex('#C0C0C0')('A') +
                        color.hex('#808080')(' Order Amount:                ') +
                        color.hex('#FFFFFF')(order_filled + '/' + order_amount + ' ') +
                        color.hex('#C0C0C0')(order_quotePair));
                        //------------------------------------------------------
                        console.log(color.hex('#DC143C')('█   ') +
                        color.hex('#C0C0C0')('X') +
                        color.hex('#808080')(' Current Order Price:         ') +
                        color.hex('#FFFFFF')(order_price + ' ') +
                        color.hex('#C0C0C0')(order_basePair));
                        //------------------------------------------------------
                        console.log(color.hex('#DC143C')('█   ') +
                        color.hex('#C0C0C0')('►') +
                        color.hex('#808080')(' New Order Price:             ') +
                        color.hex('#FFFFFF')(order_newPrice + ' ') +
                        color.hex('#C0C0C0')(order_basePair));
                        console.log(color.hex('#DC143C')('█'));
                        //------------------------------------------------------


                        //------------------------------------------------------
                        console.log(' ');
                        console.log(color.hex('#FFD700')('█'));
                        console.log(color.hex('#FFD700')('█   ') +
                        color.hex('#FFD700')
                        ('Profit:'));
                        console.log(color.hex('#FFD700')('█'));
                        //------------------------------------------------------
                        console.log(color.hex('#FFD700')('█   ') +
                        color.hex('#FFD700')('₿') +
                        color.hex('#808080')(' Estimated Profit:            ') +
                        color.hex('#FFFFFF')(order_estimatedProfit + ' ') +
                        color.hex('#C0C0C0')(config_basePair));
                        //------------------------------------------------------
                        console.log(color.hex('#FFD700')('█   ') +
                        color.hex('#C0C0C0')('~') +
                        color.hex('#808080')(' ROI:                         ') +
                        color.hex('#FFFFFF')(parseFloat(order_estimatedProfit / config_minPrice * order_amount * 100 + 100).toFixed(2) + ' ') +
                        color.hex('#C0C0C0')('%'));
                        console.log(color.hex('#FFD700')('█'));
                        //------------------------------------------------------


                    } else if (market_lowestAsk == order_price && order_price < parseFloat(market_secondLowestAsk - config_priceSteps).toFixed(6)) {

                        let order_newPrice = parseFloat(market_secondLowestAsk - config_priceSteps).toFixed(6);
                        let order_estimatedProfit = parseFloat(order_newPrice * order_amount  - config_minPrice * order_amount).toFixed(6);

                        client.modifyOrder(order_id, config_tradingPair, order_newPrice, order_amount);
                        
                        console.log('\033c');
                        //------------------------------------------------------
                        console.log(color.bgHex('#292929')
                        ('                                                       '));
                        console.log(color.bgHex('#292929').hex('#C0C0C0')
                        ('  Bot: ') +
                        color.bgHex('#292929').hex('#9ACD32')
                        ('ACTIVE') +
                        color.bgHex('#292929').hex('#C0C0C0')
                        ('   Last Status: ') +
                        color.bgHex('#292929').hex('#00CED1')
                        ('[▲] OPTIMIZING POSITION   '));
                        console.log(color.bgHex('#292929')
                        ('                                                       '));
                        //------------------------------------------------------


                        //------------------------------------------------------
                        console.log(' ');
                        console.log(color.hex('#1E90FF')('█'));
                        console.log(color.hex('#1E90FF')
                        ('█   ' + config_tradingPair + ' Market:'));
                        console.log(color.hex('#1E90FF')('█   '));
                        //------------------------------------------------------
                        console.log(color.hex('#1E90FF')('█   ') +
                        color.hex('#9ACD32')('▲') +
                        color.hex('#808080')(' Highest Bid Price:           ') +
                        color.hex('#FFFFFF')(market_highestBid + ' ') +
                        color.hex('#C0C0C0')(config_basePair));
                        //------------------------------------------------------
                        console.log(color.hex('#1E90FF')('█   ') +
                        color.hex('#C0C0C0')('÷') +
                        color.hex('#808080')(' Market Margin:               ') +
                        color.hex('#FFFFFF')(market_margin + ' ') +
                        color.hex('#C0C0C0')(config_basePair));
                        //------------------------------------------------------
                        console.log(color.hex('#1E90FF')('█   ') +
                        color.hex('#DC143C')('▼') +
                        color.hex('#808080')(' Lowest Ask Price:            ') +
                        color.hex('#FFFFFF')(market_lowestAsk + ' ') +
                        color.hex('#C0C0C0')(config_basePair));
                        console.log(color.hex('#1E90FF')('█'));
                        //------------------------------------------------------


                        //------------------------------------------------------
                        console.log(' ');
                        console.log(color.hex('#DC143C')('█'));
                        console.log(color.hex('#DC143C')('█   ') +
                        color.hex('#DC143C')
                        ('Sell Order:'));
                        console.log(color.hex('#DC143C')('█'));
                        //------------------------------------------------------
                        console.log(color.hex('#DC143C')('█   ') +
                        color.hex('#C0C0C0')('%') +
                        color.hex('#808080')(' Order Status:                ') +
                        color.hex('#FFFFFF')(parseFloat(order_filled / order_amount * 100).toFixed(2) + ' ') +
                        color.hex('#C0C0C0')('%'));
                        //------------------------------------------------------
                        console.log(color.hex('#DC143C')('█   ') +
                        color.hex('#C0C0C0')('A') +
                        color.hex('#808080')(' Order Amount:                ') +
                        color.hex('#FFFFFF')(order_filled + '/' + order_amount + ' ') +
                        color.hex('#C0C0C0')(config_quotePair));
                        //------------------------------------------------------
                        console.log(color.hex('#DC143C')('█   ') +
                        color.hex('#C0C0C0')('X') +
                        color.hex('#808080')(' Current Order Price:         ') +
                        color.hex('#FFFFFF')(order_price + ' ') +
                        color.hex('#C0C0C0')(config_basePair));
                        //------------------------------------------------------
                        console.log(color.hex('#DC143C')('█   ') +
                        color.hex('#C0C0C0')('►') +
                        color.hex('#808080')(' New Order Price:             ') +
                        color.hex('#FFFFFF')(order_newPrice + ' ') +
                        color.hex('#C0C0C0')(config_basePair));
                        console.log(color.hex('#DC143C')('█'));
                        //------------------------------------------------------


                        //------------------------------------------------------
                        console.log(' ');
                        console.log(color.hex('#FFD700')('█'));
                        console.log(color.hex('#FFD700')('█   ') +
                        color.hex('#FFD700')
                        ('Profit:'));
                        console.log(color.hex('#FFD700')('█'));
                        //------------------------------------------------------
                        console.log(color.hex('#FFD700')('█   ') +
                        color.hex('#FFD700')('₿') +
                        color.hex('#808080')(' Estimated Profit:            ') +
                        color.hex('#FFFFFF')(order_estimatedProfit + ' ') +
                        color.hex('#C0C0C0')(config_basePair));
                        //------------------------------------------------------
                        console.log(color.hex('#FFD700')('█   ') +
                        color.hex('#C0C0C0')('~') +
                        color.hex('#808080')(' ROI:                         ') +
                        color.hex('#FFFFFF')(parseFloat(order_estimatedProfit / config_minPrice * order_amount * 100 + 100).toFixed(2) + ' ') +
                        color.hex('#C0C0C0')('%'));
                        console.log(color.hex('#FFD700')('█'));
                        //------------------------------------------------------

                    }
                }
            });
    })
    .catch((err) => {
                
        console.log('\033c');
        console.log('\033c');
        //------------------------------------------------------
        console.log(color.bgHex('#292929')
        ('                                                       '));
        console.log(color.bgHex('#292929').hex('#C0C0C0')
        ('  Bot: ') +
        color.bgHex('#292929').hex('#DC143C')
        ('OFFLINE') +
        color.bgHex('#292929').hex('#C0C0C0')
        ('  Last Status: ') +
        color.bgHex('#292929').hex('#FF8C00')
        ('[..] WAITING FOR ORDER    '));
        //------------------------------------------------------
        console.log(color.bgHex('#292929')
        ('                                                       '));

    });
}

switch (config_botSpeed) {
    case 'cobinflood':
        botSpeed = 250;
        break;
    case 'fast':
        botSpeed = 500;
        break;
    case 'normal':
        botSpeed = 1000;
        break;
    case 'slow':
        botSpeed = 2000;
        break;
    default:
        botSpeed = 1000;
        break;
}

console.log('\033c');
//------------------------------------------------------
console.log(color.bgHex('#292929')
('                                                       '));
console.log(color.bgHex('#292929').hex('#C0C0C0')
('  Bot: ') +
color.bgHex('#292929').hex('#DC143C')
('OFFLINE') +
color.bgHex('#292929').hex('#C0C0C0')
('  Last Status: ') +
color.bgHex('#292929').hex('#FF8C00')
('STARTING BOT              '));
//------------------------------------------------------
console.log(color.bgHex('#292929')
('                                                       '));

setInterval(bot_modifyOrder, botSpeed); // Time in ms