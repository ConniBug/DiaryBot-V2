// eslint-disable-next-line no-unused-vars

exports.run = async(bot, msg, args) => {
    let channel = msg.channel;

    if (msg.mentions.members.first()) {
        userToVerify = msg.mentions.members.first().id;
    }
    else {
        userToVerify = args[0];
    }

    msg.reply(`Adding ${msg.guild.members.cache.find(r => r.id === userToVerify).user.username} to your diary `)

    channel.updateOverwrite(userToVerify, { VIEW_CHANNEL: true, SEND_MESSAGES: true });
}

exports.test = (bot) => {

}

exports.help = {
    name: 'add',
    usage: '*diary add <id/mention>',
    description: 'Add people to your diary!'
}