// eslint-disable-next-line no-unused-vars
var control = require("../Utils/perms/controlGroup");

exports.run = (bot, msg, args) => {
    if(args[0] == "on") {
        control.allowCommenting(msg);
        msg.reply("Public commenting now allowed!");
    } else if(args[0] == "off") {
        control.dontAllowCommenting(msg);
        msg.reply("Public commenting is now not allowed!");

    }
}

exports.test = (bot) => {

}

exports.help = {
    name: 'commenting',
    usage: '*diary commenting <on/off>',
    description: 'Manage peoples ability to comment in your diary!',
    rank: 1
}
