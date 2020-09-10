const discord = require("discord.js");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    var updatever = args[0];
    if (!args[0]) return message.reply("Gebruik ;update **[versie]**. (zonder . tussen nummers)");
    if (updatever == 100) {
        return message.channel.send("**Update 1.0**\nMe was created:tada:\nAls je een bug vindt report hem met !bug") 
    } else if (updatever == 101) {
        return message.channel.send("**Update 1.0.1**\nBug Fixes\nAls je een bug vindt report hem met !bug")
    } else if (updatever == 102) {
        return message.channel.send("**Update 1.0.2**\nBug Fixes\nAls je een bug vindt report hem met !bug")
    } else if (updatever == 110) {
        return message.channel.send("**Update 1.1.0!:tada:**\n**1.** Verbeteringen aanmeld command.\n**2.** !F1Count command added.\n**3.** !F1ucount command added.\nAls je een bug vindt report hem met !bug")
    } else if (updatever == 111) {
        return message.channel.send("**Update 1.1.1**\n**1.** !update command toegevoegd \n**2.** Bug Fixes\nAls je een bug vindt report hem met !bug**")
    } else if(updatever == 120){
        return message.channel.send("**Update 1.2.0!:tada:**\n**1.** Aanmeld command updated. \n**2.** socialmedia command toegevoegd !social **3.** Bug Fixes\nAls je een bug vindt report hem met !bug**")
    }else {
        return message.channel.send("Gebruik ;update **[versie]** (Voorbeeld ;update 111 (1.1.1).)")
    }
}

module.exports.help = {
    name: 'update',
    desc: "Krijg alle Update informatie.",
    cat: "Algemeen"
}