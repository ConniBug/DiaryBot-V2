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

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}  

async function getVersion() {
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
            return version;
        });
    } else {
        return version;
    }
    await sleep(1000);
    return version;
}

exports.run = async(bot, msg, args) => {
    await getVersion();
    msg.channel.send(`Version: ${await getVersion()}`);
}

exports.test = (bot) => {

}

exports.help = {
    name: 'info',
    usage: '*diary info',
    description: 'View Bot Infomation.',
    rank: 0
}
