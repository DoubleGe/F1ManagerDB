const discord = require("discord.js");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    return message.channel.send(lang.HALLO_HELLO);

}

module.exports.help = {
    name: 'hallo',
    desc: "Ik zeg Hallo tegen jou.",
    cat: "Algemeen"
}