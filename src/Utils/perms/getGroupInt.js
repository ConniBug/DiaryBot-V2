exports.get = (message) => {
    channelName = message.channel.parent.name.toLowerCase();;
    if(channelName === "diarys group 1") {
        return 1;
    }
    if(channelName === "diarys group 2") {
        return 2;
    }
    if(channelName === "diarys group 3") {
        return 3;
    }
    if(channelName === "diarys group 4") {
        return 4;
    }
    console.log(channelName);
}