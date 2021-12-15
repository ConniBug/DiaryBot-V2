/*eslint no-unused-vars: ["error", { "args": "none" }]*/

exports.run = async(bot, msg, args) => {
    msg.channel.delete()
}

exports.test = (bot) => {

}

exports.help = {
    name: 'delete',
    usage: '*diary delete',
    description: 'Permanently delete your diary!',
    rank: 1
}