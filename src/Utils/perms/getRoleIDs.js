exports.ids = (message) => {
    if(message != "") {
        roles = [
            "YE",
            message.guild.roles.cache.find(r => r.name === "diary group 1"),
            message.guild.roles.cache.find(r => r.name === "diary group 2"),
            message.guild.roles.cache.find(r => r.name === "diary group 3"),
            message.guild.roles.cache.find(r => r.name === "diary group 4"),
        ];
    } else {
        roles = [
            "YE",
        ];    
    }
    return (roles);
}