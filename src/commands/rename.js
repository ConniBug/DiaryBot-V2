// eslint-disable-next-line no-unused-vars
const ownershipCheck = require("../Utils/ownerChecks").diaryOwnershipCheck;

exports.run = (bot, msg, args) => {
    if(ownershipCheck(msg.channel, msg.user)) {
        let newName = args.slice(0).join(' ');
        message.channel.setName(newName);
        message.reply(`Channel name changed to: ${newName}`);
    }
}

exports.test = (bot) => {

}

exports.help = {
    name: 'rename',
    usage: '*diary rename <new channel name>',
    description: 'Renames your diary!'
}
