const discord = require("discord.js");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(lang.NO_PERMISSION);
    var botIcon = bot.user.displayAvatarURL();
    if(!args[0]) return message.channel.send("Gebruik !F1Next [Create/Read]");

    if(args[0].toLowerCase() == "create"){
        if(!args[3]) return message.channel.send("Gebruik !F1next create [racetrack] [dag] [tijd]");
        var NextEmbed = new discord.MessageEmbed()
        .setTitle(`${args[1]} GrandPrix `)
        .setDescription(`**Dag:** ${args[2]}\n**Tijd:** ${args[3]}`)
        .setFooter("Powerd by Chourgie® ", botIcon)
        .setTimestamp();

        message.channel.send(NextEmbed).then(async msg => {;
            msg.react("✅")
        });
    } else if (args[0].toLowerCase() == "read"){
        if(!args[1]) return message.channel.send("Gebruik !F1next read [messageID]");
        var channelid = message.channel.id
        bot.channels.cache.get(channelid).messages.fetch(args[1]).then(msg => {
            var reaction = msg.count;
            message.channel.send(msg.count + ".");
        });
    }

}

module.exports.help = {
    name: 'f1next',
    desc: "F1 Next Race.",
    cat: "F1"
}