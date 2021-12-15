// eslint-disable-next-line no-unused-vars

exports.run = async(bot, msg, args) => {
    let channel = msg.channel;
    channel.delete();
}

exports.test = (bot) => {

}

exports.help = {
    name: 'delete',
    usage: '*diary delete',
    description: 'Permanently delete your diary!',
    rank: 1
}