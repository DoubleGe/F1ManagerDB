const discord = require("discord.js");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    return message.channel.send("Voor regels kijk in #leauge-regels-rules");

}

module.exports.help = {
    name: 'f1regels',
    desc: "F1 GrandPrix regels.",
    cat: "F1"
}