const Discord = require("discord.js");

// eslint-disable-next-line no-unused-vars
exports.run = (bot, msg, args) => {
    const helpEmbed = new Discord.MessageEmbed();
    helpEmbed
        .setColor(16726994)
        .setFooter(bot.ownersDiscordTag, `https://i.imgur.com/91GaUEd.png`)
        .setTitle('Diary-Bot - Commands');
        // .addFields(
        //     { name: 'info', value: 'show user info', inline: false },
        //     { name: 'create', value: 'Will create a new diary channel that only you have access to', inline: false },
        //     { name: 'public', value: 'Everyone can see the channel', inline: false },
        //     { name: 'private', value: 'Only you can see the channel', inline: false },
        //     { name: 'nostaff', value: 'means non admin staff can not see the channel', inline: false },
        //     { name: 'yesstaff', value: 'means non admin staff can see but not the public', inline: false },
        //     { name: 'archive', value: 'archives the diary so only you and high ranking staff can see it (staff can unarchive them for you)', inline: false },
        //     { name: 'close', value: 'archives the diary so only high ranking staff can see it, again high ranking staff can undo this if need be (this is so if someone breaks discord ToS or our rules we have proof) if youd like staff can perm delete it for you', inline: false }
    //)
    bot.commands.forEach(e => {
        helpEmbed.addField(e.help.name, e.help.description, false);
    })
    msg.channel.send(helpEmbed);
}

exports.help = {
    name: 'help',
    usage: 'help',
    description: 'Lists all commands.'
}
