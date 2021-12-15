var config = require("../../config.json");
// eslint-disable-next-line no-unused-vars
var roleIDs = "";

exports.run = (bot, message, args) => {
    if(roleIDs == "") {
        roleIDs = require("../Utils/perms/getRoleIDs").ids(message);
    }
    message.delete().catch(O_o => { });

    if (message.guild.me.hasPermission("MANAGE_CHANNELS")) {
        message.guild.channels.create(`diary-${message.author.username}`, 
            {
                type: 'text',
                topic: `diary-${message.author.id}`,
            }
        )
        .then(channel => {
            var willStop = false;
            console.log(config.DiaryCategory_ID);
            let category = message.guild.channels.cache.find(c => c.id == config.DiaryCategory_ID && c.type == "category");

            if (!category) {
                bot.logging.log("No catagory configed placed room randomly!", "GENERIC");

                message.channel.send("No catagory configed placed room randomly!")
                    .then(msg => {
                        msg.delete({ timeout: 3000 })
                    })
                    .catch(console.error);
                willStop = true;
            }
            if (willStop) return;

            channel.setParent(category);

            channel.overwritePermissions([
                {
                    id: message.author.id,
                    allow: ['VIEW_CHANNEL','SEND_MESSAGES'],
                },
                {
                    id: message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                }
            ], 'Needed to change permissions').catch(console.error);

            message.channel.send(`Heres your diary <@${message.author.id}>! - <#${channel.id}>`)
            .then(msg => {
                msg.delete({ timeout: 10000 })
            })
            .catch(console.error);

        });
    }
    else {
        bot.logging.log("Missing perms to create/manage channels!", "GENERIC");

        message.channel.send("Missing perms to create/manage channels!")
            .then(msg => {
                msg.delete({ timeout: 5000 })
            })
            .catch(console.error);
    }
}

exports.test = (bot) => {
    if(roleIDs == "") {
        roleIDs = require("../Utils/perms/getRoleIDs").ids("");
    }

    bot.logging.log("Testing `roleIDs` import", "TESTING");
    if(roleIDs[0] != "YE") 
    {
        bot.logging.log(`Failed roleIDs test. should have been "YE" but was ${roleIDs[0]}`, "ERROR", "TESTING");
        process.exit(1);
    }
    bot.logging.log("Done", "TESTING");
}

exports.help = {
    name: 'create',
    usage: '*diary create',
    description: 'Will create a new diary channel that only you have access to.',
    rank: 0
}