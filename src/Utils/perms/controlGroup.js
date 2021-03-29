const groupInt = require("./getGroupInt");

function setPerms(msg, id, perms, type) {
    msg.channel.updateOverwrite(id, perms);
}

function setGroupPerms(message, perms) {
    roleIDs = require("./getRoleIDs").ids(message);
    switch(groupInt.get(message)) {
        case(1):
            setPerms(message, roleIDs[1], perms, "ROLE");
            break;
        case(2):
            setPerms(message, roleIDs[2], perms, "ROLE");
            break;
        case(3):
            setPerms(message, roleIDs[3], perms, "ROLE");
            break;
        case(4):
            setPerms(message, roleIDs[4], perms, "ROLE");
            break;
    }  
}

function setPublic(message) {
    setGroupPerms(message, { VIEW_CHANNEL: true });
}
function setPrivate(message) {
    setGroupPerms(message, { VIEW_CHANNEL: false });
}
function allowCommenting(message) {
    setGroupPerms(message, { SEND_MESSAGES: true });
}
function dontAllowCommenting(message) {
    setGroupPerms(message, { SEND_MESSAGES: false });
}

exports.setPublic = (message) => {
    setPublic(message);
}
exports.setPrivate = (message) => {
    setPrivate(message);
}
exports.allowCommenting = (message) => {
    allowCommenting(message);
}
exports.dontAllowCommenting = (message) => {
    dontAllowCommenting(message);
}
