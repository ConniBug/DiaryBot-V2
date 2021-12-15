/*eslint no-unused-vars: ["error", { "args": "none" }]*/

exports.run = async(bot, msg, args) => {
    let channel = msg.channel

    let userReference = null
    if (msg.mentions.members.first()) {
        userReference = msg.mentions.members.first().id
    }
    else if(args[0]) {
        userReference = args[0]
    } 
    else if(args[1]) {
        userReference = args[1]
    }

    var usr_cache = msg.guild.members.cache
    bot.logging.log(
        `Removing ${usr_cache.find(r => r.id === userReference).user.username} from ${usr_cache.find(r => r.id === msg.author.id).user.username}'s diary!`)
    msg.reply(`Removing ${usr_cache.find(r => r.id === userReference).user.username} from your diary!`)

    channel.updateOverwrite(userReference, { VIEW_CHANNEL: false, SEND_MESSAGES: false })
}

exports.test = (bot) => {

}

exports.help = {
    name: 'remove',
    usage: '*diary remove <id/mention>',
    description: 'Remove people from your diary!',
    rank: 1
}