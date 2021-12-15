/*eslint no-unused-vars: ["error", { "args": "none" }]*/
var version = require('../../package.json').version

exports.run = async(bot, msg, args) => {
    msg.channel.send(`Version: ${version}`)
}

exports.test = (bot) => {

}

exports.help = {
    name: 'info',
    usage: '*diary info',
    description: 'View Bot Infomation.',
    rank: 0
}
