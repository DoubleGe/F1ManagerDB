const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    var membercount
    var open = true;
    if(!open) return message.channel.send("Er is momenteel geen plek om te joinen. Kijk anders in #wachtlijst")
    if(!args[0]) return message.channel.send(`Gebruik ${botConfig.prefix}join [naam] [dag]`);
    if(!args[1]) return message.channel.send(`Gebruik ${botConfig.prefix}join [naam] [dag]`);
    var naam = args[0];
    var dag;
    if(args[1].toLowerCase() === "ma" ||args[1].toLowerCase() === "maandag"){
        let guild = await message.guild;
        let role = message.guild.roles.cache.find(role => role.name === "Maandag")
        let roleID = role.id;
        if(message.member.roles.cache.find(r => r.name === "Maandag")) return message.reply("Je doet al mee aan deze race.")
        membercount = guild.roles.cache.get(roleID).members.size
        if(membercount < 20){
            let member = message.member;
            member.roles.add(roleID);
            dag = "Maandag";
            membercount++;
        } else return message.channel.send("Aanmelding mislukt. Het maximaal aantal mensen doet al mee. Je kan nog mee doen in #wachtlijst")
    } else if (args[1].toLowerCase() === "wo" ||args[1].toLowerCase() === "woensdag"){
        let guild = await message.guild;
        let role = message.guild.roles.cache.find(role => role.name === "Woensdag")
        let roleID = role.id;
        console.log(role.id)
        if(message.member.roles.cache.find(r => r.name === "Woensdag")) return message.reply("Je doet al mee aan deze race.")
        membercount = guild.roles.cache.get(roleID).members.size
        if(membercount < 20){
            let member = message.member;
            member.roles.add(roleID);
            dag = "Woensdag"; 
            membercount++;
        }
    } else if(args[1].toLowerCase() === "zo" ||args[1].toLowerCase() === "zondag"){
        let guild = await message.guild;
        let role = message.guild.roles.cache.find(role => role.name === "Zondag")
        let roleID = role.id;
        if(message.member.roles.cache.find(r => r.name === "Zondag")) return message.reply("Je doet al mee aan deze race.")
        membercount = guild.roles.cache.get(roleID).members.size
        if(membercount < 20){
            let member = message.member;
            member.roles.add(roleID);
            dag = "Zondag"; 
            membercount++;
        }
    } else message.channel.send("Sorry, op die dag is geen GrandPrix. Kies uit de dagen MA, WO, ZO")


    message.channel.send(`Aanmelding Voltooid.\n~~---------------------------~~\n**F1 GrandPrix ${dag}**\n**Naam:** ${naam} \n**Mensen die meedoen: **${membercount}/20`)
    var textchan = message.member.guild.channels.cache.find(channels => channels.name === "f1-aanmeldingen");
    textchan.send(`**Aanmelding**\n**Dag:** ${dag}\n**Naam:** ${naam} (${message.author})\n(${membercount}/20)`).then(async msg => {;
    msg.react("✅")
    })
}

module.exports.help = {
    name: 'join',
    desc: "Join een F1 Seizoen.",
    cat: "F1"
}