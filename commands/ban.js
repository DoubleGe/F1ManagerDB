const discord = require("discord.js");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    //var args = message.content.slice(prefix.length).split(/ +/);

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(lang.NO_PERMISSION);

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(lang.BOT_NO_PERMISSION);

    if (!args[0]) return message.reply(lang.KICKBAN_NO_PLAYER);

    if (!args[1]) return message.reply(`Geef een reden mee.`);

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    var reason = args.slice(1).join(" ");

    if (!banUser) return message.reply(`Gebruiker ${banUser} niet gevonden`);
    
    if(warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, je kan deze gebruiker niet een waarschuwing geven.");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Reageer binnen 30 seconden")
        .setDescription(`Wil je ${banUser} bannen?`)
        .addField("Voor reden:", reason)
        .setFooter("Powerd by Chourgie®", bot.user.displayAvatarURL())
        .setTimestamp();

    var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setThumbnail(banUser.displayAvatarURL)
        .setDescription(`**Gebant:** ${banUser} (${banUser.id})
            **Gebant door:** ${message.author}
            **Reden:** ${reason}`)
        .setFooter("Powerd by Chourgie®", bot.user.displayAvatarURL())
        .setTimestamp();

    message.channel.send(embedPrompt).then(async msg => {

        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        if (emoji === "✅") {

            msg.delete();

            banUser.ban(reason).catch(err => {
                if (err) return message.reply("Er is iets fout gegaan.");
            });

            message.channel.send(embed)

        } else if (emoji === "❌") {

            msg.delete();

            return message.reply("Heeft de ban geanuleerd").then(m => m.delete(5000));

        }

    })
}

async function promptMessage(message, author, time, reactions) {

    time *= 1000;

    for (const reaction of reactions) {
        await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);

}

module.exports.help = {
    name: 'hallo',
    desc: "Ban een gebruiker.",
    cat: "Admin"
}