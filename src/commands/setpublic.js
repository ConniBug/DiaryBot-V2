// eslint-disable-next-line no-unused-vars

exports.run = (bot, msg, args) => {
    msg.channel.updateOverwrite(msg.guild.id, { VIEW_CHANNEL: true });
    msg.reply("Diary is now public!");
}

exports.test = (bot) => {

}

exports.help = {
    name: 'public',
    usage: '*diary public',
    description: 'Set your diary as public!',
    rank: 1
}
