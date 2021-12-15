/*eslint no-unused-vars: ["error", { "args": "none" }]*/
var checkOwnership = require('../Utils/ownerChecks').diaryOwnershipCheck

exports.run = (bot, message, args) => {
    if(checkOwnership(message.channel, message.author)) {
        message.reply('You have perms here.')
    } else {
        message.reply('You do not have perms here.')
    }
}

exports.test = (bot) => {

}

exports.help = {
    name: 'permcheck',
    usage: '*diary permcheck',
    description: 'Lil check thingie.',
    rank: 3
}