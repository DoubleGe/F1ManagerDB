const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    // try {

    //     if (!args[0]) {
    //         var help = new discord.MessageEmbed()
    //             .setColor("#0b84b8")
    //             .setTitle("Help")
    //             .setDescription("Gebruik ;help [menu]\n**Menu's:** `Admin` `Fun` `Muziek` `Overig`")
    //             .setTimestamp()
    //             .setFooter("Chourgie®", bot.user.displayAvatarURL())
    //     } else {
    //         var helpvar = args[0].toLowerCase();
    //         if (helpvar === "admin") {
    //             if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(lang.NO_PERMISSION);
    //             var help = new discord.MessageEmbed()
    //                 .setTitle("Help Admin")
    //                 .setColor("#0b84b8")
    //                 .setDescription("Commands")
    //                 .addFields({
    //                     name: `${botConfig.prefix}clear [aantal]`, value: "Clear de chat.",
    //                     name: `${botConfig.prefix}kick [gebruiker] [reden]`, value: "Kick een gebruiker.",
    //                     name: `${botConfig.prefix}ban [gebruiker] [reden]`, value: "Ban een gebruiker.",
    //                     name: `${botConfig.prefix}tempmute [gebruiker] [tijd(S,m,u etc.)]`, value: "Mute een gebruiker",
    //                 });
    //         }
    //     }


    //     return message.channel.send(help);
    // } catch (err) {
    //     message.reply("Er ging iets fout.");
    //     console.log(err);
    // }

     var commandList = [];
     var prefix = botConfig.prefix;

     bot.commands.forEach(command => {

        var constructor ={
            name: command.help.name,
            description: command.help.desc,
            catergory: command.help.cat
        }
        commandList.push(constructor);

     });

     var response = "**Bot Commands**\n\n";
     var general = "**Algemeen**\n";
     var F1 = "\n**F1**\n";
     var admin = "\n**Admin**\n";
     var overig = "\n**Overig**\n";

     for (let i = 0; i < commandList.length; i++) {
         const command = commandList[i];

         if(command["catergory"] == "Algemeen"){
             general += `${prefix}${command["name"]} - ${command["description"]}\n`;
         } else if (command["catergory"] == "F1"){
            F1 += `${prefix}${command["name"]} - ${command["description"]}\n`;
         }else if (command["catergory"] == "Admin"){
            admin += `${prefix}${command["name"]} - ${command["description"]}\n`;
         } else if (command["catergory"] == "Hide"){
            console.log(`${prefix}${command["name"]} - ${command["description"]}`)
         } else {
            overig += `${prefix}${command["name"]} - ${command["description"]}\n`;
         }
     }

     response += general;
     response += F1;
     if (message.member.hasPermission("MANAGE_MESSAGES")) response += admin;
     response += overig;

     message.author.send(response).then(() => {
         message.channel.send("Commands zijn verzonden naar je dm. :mailbox_with_mail:");
     }).catch(() =>{
        message.channel.send("Je prive berichten staan uit, dus ik kan je niks versturen.");
     })

}

module.exports.help = {
    name: 'help',
    desc: "Laat dit zien.",
    cat: "Algemeen"
}