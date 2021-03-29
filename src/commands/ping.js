// eslint-disable-next-line no-unused-vars
exports.run = (bot, msg, args) => {
    msg.channel.send(':watch: | Ping!').then(m => {
        m.edit(`:watch: | Pong! \`${m.createdTimestamp - msg.createdTimestamp}ms\``)
    })
}

exports.test = (bot) => {

}

exports.help = {
    name: 'ping',
    usage: '*diary ping',
    description: 'Pings the bot to check its connection speed.',
    rank: 0
}
