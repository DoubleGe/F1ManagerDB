const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    //;giveaway aantalwinnaars tijd prijs

    var item = "";
    var time;
    var winnerCount;

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(lang.NO_PERMISSION);
    if(!args[2]) return message.reply(`Gebruik ${botConfig.prefix}giveaway [aantalWinnaars] [tijd] [prijs]`)
    
    winnerCount = args[0];
    time = args[1];
    item = args.splice(2,args.length).join(" ");

    message.delete();

    var date = new Date().getTime();
    var dateEnd = new Date(date + (time * 1000));

    var giveawayEmbed = new discord.MessageEmbed()
    .setTitle("🎉 **GIVEAWAY** 🎉")
    .setDescription(`**GiveAway Item:** ${item}\n **Eindigt op:** ${dateEnd}`)
    .setFooter("Powerd by Chourgie®", bot.user.displayAvatarURL())
    .setTimestamp();

    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉")

    setTimeout(function(){
        var random = 0;
        var winnners = [];
        var inList = false;

        var peopleReacted = embedSend.reactions.cache.get("🎉").users.cache.array();
        for (let i = 0; i < peopleReacted.length; i++) {
            if(peopleReacted[i].id == bot.user.id) {
                peopleReacted.splice(i, 1);
                continue;
            }
        }

        if(peopleReacted.length == 0) return message.channel.send("Niemand heeft mee gedaan, dus niemand heeft gewonnen.");
        if(peopleReacted.length < winnerCount) return message.channel.send("Er hebben te weinig mensen mee gedaan, dus niemand heeft gewonnen.");

        for (let y = 0; y < winnerCount; y++) {
            inList = false;
            random = Math.floor(Math.random() * peopleReacted.length)
            
            for (let o = 0; o < winnners.length; o++) {
                if(winnners[o] == peopleReacted[random]){
                    inList = true;
                    y--;
                    break;
                }
                
            }
            if(!inList) winnners.push(peopleReacted[random]);
        }

        for (let y = 0; y < winnners.length; y++) {
                message.channel.send(`Gefeliciteerd ${winnners[y]}. Je hebt **${item}** gewonnen.`)
            
        }

    }, time*1000)

}

module.exports.help = {
    name: 'giveaway',
    desc: "Maak een giveaway aan",
    cat: "Admin"
}