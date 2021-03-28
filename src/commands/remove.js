// eslint-disable-next-line no-unused-vars

exports.run = async(bot, msg, args) => {
    let channel = msg.channel;

    if (msg.mentions.members.first()) {
        userReference = msg.mentions.members.first().id;
    }
    else {
        userReference = args[0];
    }

    msg.reply(`Removing ${msg.guild.members.cache.find(r => r.id === userReference).user.username} from your diary!`)

    channel.updateOverwrite(userReference, { });
}

exports.test = (bot) => {

}

exports.help = {
    name: 'remove',
    usage: '*diary remove <id/mention>',
    description: 'Remove people from your diary!'
}