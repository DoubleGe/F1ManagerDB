const discord = require("discord.js");
const botconfig = require("../botconfig.json");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    if(message.author.id != botconfig.BotOwnerID) return lang.NO_PERMISSION;
    message.channel.send('Shutting down...').then(m => {
        bot.destroy();
      });

}

module.exports.help = {
    name: 'shutdown',
    desc: "Shutdown de bot.",
    cat: "Hide"
}