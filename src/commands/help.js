/*eslint no-unused-vars: ["error", { "args": "none" }]*/
const Discord = require('discord.js')

exports.run = (bot, msg, args) => {
    const normalTier = new Discord.MessageEmbed()
    normalTier
        .setColor(16726994)
        .setFooter(bot.ownersDiscordTag, 'https://i.imgur.com/91GaUEd.png')
        .setTitle('Diary-Bot - Commands for Everyone!')
    bot.commands.forEach(e => {
        if(e.help.rank == 0) {
            normalTier.addField(`${e.help.name}`, e.help.description + '\n \n Usage \n' + e.help.usage, false)
        }
    })
    msg.channel.send(normalTier)

    const diaryOwnersTier = new Discord.MessageEmbed()
    diaryOwnersTier
        .setColor(16726994)
        .setFooter(bot.ownersDiscordTag, 'https://i.imgur.com/91GaUEd.png')
        .setTitle('Diary-Bot - Commands for diary owners')
    bot.commands.forEach(e => {
        if(e.help.rank == 1) {
            diaryOwnersTier.addField(e.help.name, e.help.description + '\n \n Usage \n' + e.help.usage, false)
        }
    })
    msg.channel.send(diaryOwnersTier)
    
    if(msg.author.id == '299709641271672832') {
        const etcTier = new Discord.MessageEmbed()
        etcTier
            .setColor(16726994)
            .setFooter(bot.ownersDiscordTag, 'https://i.imgur.com/91GaUEd.png')
            .setTitle('Diary-Bot - Other')
        bot.commands.forEach(e => {
            if(e.help.rank > 1) {
                etcTier.addField(e.help.name, e.help.description + '\n \n Usage \n' + e.help.usage, false)
            }
        })
        msg.channel.send(etcTier)
    }
}

exports.test = (bot) => {

}

exports.help = {
    name: 'help',
    usage: '*diary help',
    description: 'Lists all commands.',
    rank: 0
}
