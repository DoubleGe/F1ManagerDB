const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async(bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL();

        var botEmbed = new discord.MessageEmbed()
            .setTitle("Bot info")
            .setColor("#0b84b8")
            .setThumbnail(botIcon)
            .addFields(
                {name: "Bot naam:", value: bot.user.username},
                {name: "Version", value: botConfig.version},
                {name: "Servers: ", value : bot.guilds.cache.size},
                {name: "Gemaakt op:", value: bot.user.createdAt},
                {name: "Gemaakt door:", value: "Double_Gezicht#6874 / Wesley"}
            )
            .setTimestamp()
            .setFooter("Powerd by Chourgie®", botIcon);
    

        return message.channel.send(botEmbed);

}

module.exports.help = {
    name: 'botinfo',
    desc: "Krijg informatie over de bot.",
    cat: "Algemeen"
}