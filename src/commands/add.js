// eslint-disable-next-line no-unused-vars

exports.run = async(bot, msg, args) => {
    let channel = msg.channel;

    if (msg.mentions.members.first()) {
        userReference = msg.mentions.members.first().id;
    }
    else if(args[0]) {
        userReference = args[0];
    } 
    else if(args[1]) {
        userReference = args[1];
    }

    var usr_cache = msg.guild.members.cache;
    bot.logging.log(
        `Adding ${usr_cache.find(r => r.id === userReference).user.username} to ${usr_cache.find(r => r.id === msg.author.id).user.username}'s diary!`);

    msg.reply(`Adding ${usr_cache.find(r => r.id === userReference).user.username} to your diary `);

    channel.updateOverwrite(userReference, { VIEW_CHANNEL: true, SEND_MESSAGES: true });
}

exports.test = (bot) => {

}

exports.help = {
    name: 'add',
    usage: '*diary add <id/mention>',
    description: 'Add people to your diary!',
    rank: 1
}