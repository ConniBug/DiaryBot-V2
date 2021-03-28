var diaryTopicNameStartsWith = "diary-";
var staffRoleID = "716273854594678844";

function diaryOwnershipCheck(channel, user) {
    if (channel.topic !== `${diaryTopicNameStartsWith}${user.id}`) {
        // if(user.id === "299709641271672832") {
        //     return true;
        // }
        return false;
    }
    return true;
}

exports.diaryOwnershipCheck = (channel, user) => {
    return diaryOwnershipCheck(channel, user);
}