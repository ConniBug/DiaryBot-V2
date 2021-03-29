// eslint-disable-next-line no-unused-vars
var setPublic = require("../Utils/perms/controlGroup").setPublic;

exports.run = (bot, msg, args) => {
    setPublic(msg);
    msg.reply("Diary is now public!");
}

exports.test = (bot) => {

}

exports.help = {
    name: 'public',
    usage: '*diary public',
    description: 'Set your diary as public!',
    rank: 1
}
