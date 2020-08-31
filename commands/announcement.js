const discord = require("discord.js");
const lang = require("../lang.json");
const config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(lang.NO_PERMISSION);

    var seperator = "|";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Oeps er ging iets fout!")
            .setColor("#0be300")
            .setDescription(`Maak een announcement door gebruik te maken van: \n${config.prefix}announcement titel ${seperator} bericht ${seperator} kleur ${seperator} kanaal`)

        return message.reply(embed);
    }

    var argsList = args.join(" ").split(seperator);

    if (argsList[2] === undefined) argsList[2] = "#eeeeee";
    if (argsList[3] === undefined) argsList[3] = "general";

    var options = {

        titel: argsList[0],
        bericht: argsList[1] || "Geen bericht meegegeven",
        kleur: argsList[2].trim(),
        kanaal: argsList[3].trim()

    }

    var announceEmbed = new discord.MessageEmbed()
        .setTitle(options.titel)
        .setColor(options.kleur)
        .setDescription(`${options.bericht} \n\nBericht verzonden door: ${message.author}`)
        .setTimestamp()
        .setFooter("Powerd by Chourgie®", bot.user.displayAvatarURL())

    var channel = message.member.guild.channels.cache.find(channels => channels.name === options.kanaal);
    if(!channel) return message.reply(`Het kanaal ${channel} bestaat niet.`);

    channel.send("@everyone" ,announceEmbed);

}

module.exports.help = {
    name: 'announcement',
    desc: "Announce iets in een channel.",
    cat: "Admin"
}