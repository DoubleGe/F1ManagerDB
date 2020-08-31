const discord = require("discord.js");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    return message.channel.send("F1 SETTINGS [WIP]");

}

module.exports.help = {
    name: 'f1settings',
    desc: "F1 GrandPrix settings.",
    cat: "F1"
}