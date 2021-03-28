const groupIDs = require("./getRoleIDs");

exports.get = (channelName) => {
    if(channelName === "diarys group 1") {
        setTimeout(() => message.channel.updateOverwrite(groupIDs[1], { VIEW_CHANNEL: true  }), 2500);
    }
    if(channelName === "diarys group 2") {
        setTimeout(() => message.channel.updateOverwrite(groupIDs[2], { VIEW_CHANNEL: true  }), 2500);
    }
    if(channelName === "diarys group 3") {
        setTimeout(() => message.channel.updateOverwrite(groupIDs[3], { VIEW_CHANNEL: true  }), 2500);
    }
    if(channelName === "diarys group 4") {
        setTimeout(() => message.channel.updateOverwrite(groupIDs[4], { VIEW_CHANNEL: true  }), 2500);
    }
    // if(channelName === "diarys group 5") {
    //   //  setTimeout(() => message.channel.updateOverwrite(group5RoleID, { VIEW_CHANNEL: true  }),2500);
    // }
}