// eslint-disable-next-line no-unused-vars
exports.run = (bot, msg, args) => {
    if (msg.author.id !== '299709641271672832') {
        msg.channel.send('Bruh.').then(() => {
            process.exit(0);
        })
        return;
    }

    msg.channel.send('Restarting...').then(() => {
        process.exit(0);
    })
}

exports.test = (bot) => {

}

exports.help = {
    name: 'restart',
    usage: 'restart',
    description: 'restart. restart the bot'
}
