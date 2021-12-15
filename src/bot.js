const log = require('@connibug/js-logging');
const { exec } = require("child_process");
let alreadUpToDateREGEX = new RegExp('Already.up.to.date');

function handleCD () {
    exec("git stash", (error, stdout, stderr) => {
        exec("git pull", (error, stdout, stderr) => {
            if (error) {
                log.error(`error: ${error.message}`);
                
                // As there was an issue restart
                process.exit(1);
            }
            if (stderr) {
                log.error(`stderr: ${stderr}`);
            }
            if(stdout.match(alreadUpToDateREGEX)) {
                return;
            }
            else {
                log.log(`stdout: ${stdout}`);
                process.exit(1);
            }
        });
    });
}

var timeBetweenStockChecks = 3; // seconds
setInterval(async function(){
    handleCD();
}, timeBetweenStockChecks * 1000);

handleCD();


const path = require('path')
const fs = require('fs')
const { Client, Intents } = require('discord.js')

var checkOwnership = require('./Utils/ownerChecks').diaryOwnershipCheck

var config = {};
if(!process.argv[2]) config = require("../config.json");
else  config = require("../config.json");

console.log(config);

config = (() => {
    const token = config.BOT_TOKEN
    if(!token) {
        log.error('Missing BOT_TOKEN environment variable')
        process.exit(1)
    }

    if(!/^[a-zA-Z0-9_.-]{59}$/.test(token) && !process.argv[2]) {
        log.error('Invalid discord token!')
        process.exit(1)
    }

    const prefix = config.BOT_PREFIX
    if(!prefix) {
        log.error('Missing BOT_PREFIX env variable')
        process.exit(1)
    }

    const ownersDiscordTag = config.ownersDiscordTag
    if(ownersDiscordTag == "1") {
        ownersDiscordTag = null
    }
    return { token, prefix, ownersDiscordTag }
})()

const commands = new Map()
const intents = new Intents([
    Intents.NON_PRIVILEGED,
    'GUILD_MEMBERS',
])
const bot = new Client({ /*partials: ['MESSAGE', 'CHANNEL', 'REACTION'], */ ws: { intents }, fetchAllMembers: true, disableEveryone: true })
bot.config = config
bot.commands = commands
bot.logging = log
bot.ownersDiscordTag = config

log.log('----------------------------')
log.log(`0/${bot.commands.size} - Loading commands.`)
log.log('----------------------------')
var cnt = 0
fs.readdirSync(path.resolve(__dirname, 'commands'))
    .filter(f => f.endsWith('.js'))
    .forEach(f => {
        cnt++
        log.log(`${cnt}/${bot.commands.size} - Loading command ${f}`)
        try {
            let command = require(`./commands/${f}`)
            if(typeof command.run !== 'function') {
                log.log('Command is missing a run function!', 'ERROR')
                throw 'Command is missing a run function!'
            } else if(!command.help || !command.help.name) {
                log.log('Command is missing a valid help object!', 'ERROR')
                throw 'Command is missing a valid help object!'
            }
            commands.set(command.help.name, command)
        } catch(error) {
            log.log(`Failed to load command ${f}: ${error}`, 'ERROR')
            console.error(`Failed to load command ${f}: ${error}`)
        }
    })

bot.on('ready', () => {
    log.log(`Logged in as ${bot.user.tag} (ID: ${bot.user.id})`, 'GENERIC')
    bot.generateInvite({
        permissions: [
            'SEND_MESSAGES',
            'MANAGE_MESSAGES',
        ]
    }).then(invite => {
        log.log(`Click here to invite the bot to your guild:\n${invite}`, 'GENERIC')
    })
})

bot.on('message', async message => {
    if(message.author.bot || !message.guild) {
        return
    }

    let { content } = message
    if(!content.startsWith(config.prefix)) {
        return
    }
    let split = content.substr(config.prefix.length).split(' ')

    let label = split[0]
    let args = split.slice(1)
    
    if(commands.get(label)) {
        try {
            var currentCommand = commands.get(label)
            if(currentCommand.help.rank >= 1) {
                if(currentCommand.help.rank >= 2 && message.author.id == '299709641271672832') {
                    commands.get(label).run(bot, message, args)
                } else {
                    if(checkOwnership(message.channel, message.author)) {
                        commands.get(label).run(bot, message, args)
                    } else {
                        message.reply('You do not have perms here.')
                    }
                }
            } else {
                commands.get(label).run(bot, message, args)
            }
        } catch(e) {
            console.log(e)
        }
    }
})

if(config && config.token) {
    bot.login(config.token)
} else {
    log.log('No valid token!', 'ERROR')
    console.log(config)
    process.exit(1)
}
