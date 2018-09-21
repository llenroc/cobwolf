// tools.js
// ========
const color = require('chalk');

module.exports = {
    print: function ($request) {
        switch ($request) {
            case 'WaitingForOrder':
    
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
                
                break;

            case 'StartingBot':
    
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
                
                break;
        
            default:
                break;
        }
    },
    clear: function () {
        console.log('\033c');
    }
};