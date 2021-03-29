// eslint-disable-next-line no-unused-vars
var setPrivate = require("../Utils/perms/controlGroup").setPrivate;

exports.run = (bot, msg, args) => {
    setPrivate(msg);
    msg.reply("Diary is now private!");
}

exports.test = (bot) => {

}

exports.help = {
    name: 'private',
    usage: '*diary private',
    description: 'Set your diary as private!',
    rank: 1
}
