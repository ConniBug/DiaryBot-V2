// eslint-disable-next-line no-unused-vars
const fs = require('fs')

var version = "";
fs.readFile('./Version.V', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(`Version ${version}`)
    Version = data;
});

function getVersion() {
    if(version == "") {
        fs.readFile('./Version.V', 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            if(version == "") {
                if(data != version) {
                    console.log(`version is: ${data}`);
                    version = data
                } 
            }
          });
    }
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
