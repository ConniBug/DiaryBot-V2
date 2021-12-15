/*eslint no-unused-vars: ["error", { "args": "none" }]*/
var config = require('../../config.json')

exports.run = (bot, msg, args) => {
    if (msg.author.id !== config.owner_id) {
        msg.channel.send('Bruh.').then(() => {
            process.exit(0)
        })
        return
    }

    msg.channel.send('Restarting...').then(() => {
        process.exit(0)
    })
}

exports.test = (bot) => {

}

exports.help = {
    name: 'restart',
    usage: '*diary restart',
    description: 'restart. restart the bot',
    rank: 3
}
