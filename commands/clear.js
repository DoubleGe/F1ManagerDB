const discord = require("discord.js");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(lang.NO_PERMISSION);

    if (!args[0]) return message.reply(lang.CLEAR_NUMBER);

    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            if (args[0] <= 0) {
                message.reply(`Ik kan geen ${args[0]} berichten verwijderen.`).then(msg => msg.delete({ timeout: 3000 }));
            } else if (args[0] == 1) {
                message.reply(`Ik heb een ${args[0]} bericht verwijderd.`).then(msg => msg.delete({ timeout: 3000 }));
            } else if (args[0] > 1) {
                message.reply(`Ik heb een ${args[0]} berichten verwijderd.`).then(msg => msg.delete({ timeout: 3000 }));
            }

        })

    } else {
        return message.reply(`${args[0]} is geen nummer.`)
    }

}

module.exports.help = {
    name: 'clear',
    desc: "Clear de chat.",
    cat: "Admin"
}