const discord = require("discord.js");
const ms = require("ms");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(lang.NO_PERMISSION);

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(lang.BOT_NO_PERMISSION);

    if (!args[0]) return message.reply(lang.KICKBAN_NO_PLAYER);

    var muteUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!muteUser) return message.reply(`Gebruiker ${muteUser} niet gevonden`);

    if(muteUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, je kan deze gebruiker niet muten.");

    var muteRole = message.guild.roles.cache.get('517778864592781312');
    if(!muteRole) return message.channel.send("De rol muted is niet gevonden.");

    var muteTime = args[1];

    if(!muteTime) return message.channel.send("Geef een tijd mee");

    await(muteUser.roles.add(muteRole.id));
    message.channel.send(`${muteUser} is gemute voor ${muteTime}`);

    setTimeout(() => {

        muteUser.roles.remove(muteRole.id);
        message.channel.send(`${muteUser} is geunmute`);

    }, ms(muteTime));
}

module.exports.help = {
    name: 'tempmute',
    desc: "tempmute een gebruiker.",
    cat: "Admin"
}