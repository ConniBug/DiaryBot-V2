const Discord = require("discord.js");

// eslint-disable-next-line no-unused-vars
exports.run = (bot, msg, args) => {
    const helpEmbed = new Discord.MessageEmbed();
    helpEmbed
        .setColor(16726994)
        .setFooter(bot.ownersDiscordTag, `https://i.imgur.com/91GaUEd.png`)
        .setTitle('Diary-Bot - Commands');
    bot.commands.forEach(e => {
        helpEmbed.addField(e.help.name, e.help.description, false);
    })
    msg.channel.send(helpEmbed);
}

exports.test = (bot) => {

}

exports.help = {
    name: 'help',
    usage: 'help',
    description: 'Lists all commands.'
}
