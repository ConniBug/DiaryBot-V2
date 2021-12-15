// eslint-disable-next-line no-unused-vars
const ownershipCheck = require("../Utils/ownerChecks").diaryOwnershipCheck;

exports.run = (bot, msg, args) => {
    let newName = args.join(' ');
    msg.channel.setName(newName);
    msg.reply(`Channel name changed to: ${newName}`);
}

exports.test = (bot) => {

}

exports.help = {
    name: 'rename',
    usage: '*diary rename <new channel name>',
    description: 'Renames your diary!',
    rank: 1
}
