const discord = require("discord.js");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    return message.channel.send("USER SETTINGS [WIP]");

}

module.exports.help = {
    name: 'usersettings',
    desc: "F1 GrandPrix Usersettings.",
    cat: "F1"
}