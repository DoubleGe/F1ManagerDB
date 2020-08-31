const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var servericon = message.guild.iconURL();
        var botIcon = bot.user.displayAvatarURL();

        var serverEmbed = new discord.MessageEmbed()
            .setTitle("Server info")
            .setColor("#0b84b8")
            .setThumbnail(servericon)
            .addFields(
                {name: "Discord server naam: ", vallue: message.guild.name},
                {name: "Jij bent gejoined op: ", value: message.member.joinedAt},
                {name: "Totaal aantal members: ", value: message.guild.memberCount}
            )
            .setFooter("Powerd by Chourgie® ", botIcon)
            .setTimestamp();
    

        return message.channel.send(serverEmbed);
}

module.exports.help = {
    name: 'serverinfo',
    desc: "Krijg informatie over de server.",
    cat: "Algemeen"
}