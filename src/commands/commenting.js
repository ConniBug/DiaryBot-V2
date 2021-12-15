// eslint-disable-next-line no-unused-vars

exports.run = (bot, msg, args) => {
    if(args[0] == 'on') {
        msg.channel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: true })
        msg.reply('Public commenting now allowed!');
    } else if(args[0] == 'off') {
        msg.channel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: false })
        msg.reply('Public commenting is now not allowed!');
    }
}

exports.test = (bot) => {

}

exports.help = {
    name: 'commenting',
    usage: '*diary commenting <on/off>',
    description: 'Manage peoples ability to comment in your diary!',
    rank: 1
}
