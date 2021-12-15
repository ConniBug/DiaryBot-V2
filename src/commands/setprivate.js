/*eslint no-unused-vars: ["error", { "args": "none" }]*/

exports.run = (bot, msg, args) => {
    msg.channel.updateOverwrite(msg.guild.id, { VIEW_CHANNEL: false })
    msg.reply('Diary is now private!')
}

exports.test = (bot) => {

}

exports.help = {
    name: 'private',
    usage: '*diary private',
    description: 'Set your diary as private!',
    rank: 1
}
