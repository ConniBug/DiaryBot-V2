// eslint-disable-next-line no-unused-vars
const ownershipCheck = require("../Utils/ownerChecks").diaryOwnershipCheck;

exports.run = (bot, msg, args) => {
    if(ownershipCheck(msg.channel, msg.author)) {
        let newName = args.join(' ');
        msg.channel.setName(newName);
        msg.reply(`Channel name changed to: ${newName}`);
    }
}

exports.test = (bot) => {
    var tmp_user = {
        id: "1234567890"
    };
    var tmp_channel = {
        topic: "diary-" + tmp_user.id
    }; 
    if(!ownershipCheck(tmp_channel, tmp_user)) {
        bot.logging.log(`Failed ownershipChecks!`, "ERROR");
        return false;
    }
    tmp_user.id += "3213";
    if(ownershipCheck(tmp_channel, tmp_user)) {
        bot.logging.log(`Failed ownershipChecks!`, "ERROR");
        return false;
    }

}

exports.help = {
    name: 'rename',
    usage: '*diary rename <new channel name>',
    description: 'Renames your diary!',
    rank: 1
}
