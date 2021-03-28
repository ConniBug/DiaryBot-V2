// eslint-disable-next-line no-unused-vars

var version = "";
fs.readFile('../../Version.V', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    Version = data;
});

function getVersion() {
    return version;
}

exports.run = (bot, msg, args) => {
    msg.channel.send(`Version: ${getVersion()}`);
}

exports.test = (bot) => {

}

exports.help = {
    name: 'info',
    usage: 'info',
    description: 'View Bot Infomation.'
}
