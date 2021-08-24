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

const logging = require('./Utils/logging')
var checkOwnership = require('./Utils/ownerChecks').diaryOwnershipCheck
var nodemailer = require('nodemailer')

if(!process.argv[2] == 'test') var config2 = require("../config.json");

var transporter = nodemailer.createTransport({
    host: 'mail.spookiebois.club',
    port: 587,
    auth: {
        user: config2.EMAIL,
        pass: config2.EMAIL_PASS
    }
})

function sendMail(to_t, content, subject = 'N/A') {
    var mailOptions = {
        from: config2.EMAIL,
        to: to_t,
        subject: `${subject}`,
        html: `${content}`,
        // text: 'That was easy!',
    }

    transporter.sendMail(mailOptions, function(error) {
        if(error) {
            console.log(error)
        }
    })
}

// sendMail(config2.ADMIN_EMAIL, 'Diary Bot Started', 'Diary Bot Started')

const config = (() => {
    const token = config2.BOT_TOKEN
    if(!token) {
        logging.log('Missing BOT_TOKEN environment variable', 'ERROR')
        console.error('Missing BOT_TOKEN environment variable')
        process.exit(0)
    }

    if(!/^[a-zA-Z0-9_.-]{59}$/.test(token)) {
        logging.log('Invalid discord token!', 'ERROR')
        console.error('Invalid discord token!')
        process.exit(1)
    }

    const prefix = config2.BOT_PREFIX
    if(!prefix) {
        logging.log('Missing BOT_PREFIX env variable', 'ERROR')
        console.error('Missing BOT_PREFIX env variable')
        process.exit(1)
    }

    return { token, prefix }
})()

const commands = new Map()
const intents = new Intents([
    Intents.NON_PRIVILEGED,
    'GUILD_MEMBERS',
])
const bot = new Client({ /*partials: ['MESSAGE', 'CHANNEL', 'REACTION'], */ ws: { intents }, fetchAllMembers: true, disableEveryone: true })
bot.config = config
bot.commands = commands
bot.logging = logging
bot.ownersDiscordTag = 'Conni!~#0920'

logging.log('----------------------------', 'GENERIC')
logging.log(`0/${bot.commands.size} - Loading commands.`, 'GENERIC')
logging.log('----------------------------', 'GENERIC')
var cnt = 0
fs.readdirSync(path.resolve(__dirname, 'commands'))
    .filter(f => f.endsWith('.js'))
    .forEach(f => {
        cnt++
        logging.log(`${cnt}/${bot.commands.size} - Loading command ${f}`, 'GENERIC')
        try {
            let command = require(`./commands/${f}`)
            if(typeof command.run !== 'function') {
                logging.log('Command is missing a run function!', 'ERROR')
                throw 'Command is missing a run function!'
            } else if(!command.help || !command.help.name) {
                logging.log('Command is missing a valid help object!', 'ERROR')
                throw 'Command is missing a valid help object!'
            }
            commands.set(command.help.name, command)
        } catch(error) {
            logging.log(`Failed to load command ${f}: ${error}`, 'ERROR')
            console.error(`Failed to load command ${f}: ${error}`)
        }
    })

bot.on('ready', () => {
    logging.log(`Logged in as ${bot.user.tag} (ID: ${bot.user.id})`, 'GENERIC')
    bot.generateInvite({
        permissions: [
            'SEND_MESSAGES',
            'MANAGE_MESSAGES',
        ]
    }).then(invite => {
        logging.log(`Click here to invite the bot to your guild:\n${invite}`, 'GENERIC')
        if(process.argv[2] === 'test') {
            logging.log('----------------------------', 'TESTING')
            if(bot.user.tag != '' && invite != '' &&
                bot.user.id != '') {
                logging.log('Logged in with success.', 'TESTING')
                logging.log('----------------------------', 'TESTING')
                logging.log('Finished bot connection test.', 'TESTING')
                logging.log('----------------------------', 'TESTING')
                process.exit(0)
            } else {
                logging.log('----------------------------', 'TESTING')
                logging.log('Logged in without success.', 'TESTING')
                logging.log('----------------------------', 'TESTING')
                logging.log('Finished bot connection test.', 'TESTING')
                logging.log('----------------------------', 'TESTING')
                process.exit(1)
            }
        }
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
    split = split.slice(1)

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

if(config && config.token && (!process.argv[2] == 'test' || !process.argv[2])) {
    bot.login(config.token)
} else if(process.argv[2] == 'test') {
    logging.log('----------------------------', 'TESTING');
    logging.log(`Running tests`);
    logging.log('----------------------------', 'TESTING');
    var cnt = 0
    bot.commands.forEach(e => {
        cnt++
        logging.log(`- ${cnt}/${bot.commands.size} - ${e.help.name}.js`, 'TESTING')
        e.test(bot)
        logging.log('Passed.', 'TESTING')
        logging.log('----------------------------', 'TESTING')
    })
    logging.log('Completed.', 'TESTING')
    logging.log('----------------------------', 'TESTING')

    logging.log('Testing bot connection.', 'TESTING')
    bot.login(config.token)
} else {
    logging.log('No valid token!', 'ERROR')
    console.log(config)
    console.log(process.argv[2])
    process.exit(1)
}
