const groupInt = require("./getGroupInt");
const roleIDs = require("./getRoleIDs").ids();

function setPublic(message) {
    var name = message.channel.parent.name.toLowerCase();
    //  console.log(name);
    switch(groupInt.get(name)) {
        case(1):
            setTimeout(() => message.channel.updateOverwrite(roleIDs[1], { VIEW_CHANNEL: true  }), 12);
            break;
        case(2):
            setTimeout(() => message.channel.updateOverwrite(roleIDs[2], { VIEW_CHANNEL: true  }), 12);
            break;
        case(3):
            setTimeout(() => message.channel.updateOverwrite(roleIDs[3], { VIEW_CHANNEL: true  }), 12);
            break;
        case(4):
            setTimeout(() => message.channel.updateOverwrite(roleIDs[4], { VIEW_CHANNEL: true  }), 12);
            break;
    }
}

exports.setPublic = (message) => {
    setPublic(message);
}

function setPrivate(channel) {
    console.log(roleIDs);
    var name = channel.parent.name.toLowerCase();
    switch(groupInt.get(name)) {
        case(1):
            setTimeout(() => message.channel.updateOverwrite(roleIDs[1], { VIEW_CHANNEL: false  }), 12);
            break;
        case(2):
            setTimeout(() => message.channel.updateOverwrite(roleIDs[2], { VIEW_CHANNEL: false  }), 12);
            break;
        case(3):
            setTimeout(() => message.channel.updateOverwrite(roleIDs[3], { VIEW_CHANNEL: false  }), 12);
            break;
        case(4):
            setTimeout(() => message.channel.updateOverwrite(roleIDs[4], { VIEW_CHANNEL: false  }), 12);
            break;
    }    
}

exports.setPrivate = (channel) => {
    setPrivate(channel);
}