const discord = require("discord.js");
const botConfig = require("../botconfig.json");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {
    var guild = await message.guild;
    var membercount
    var open = true;
    if(!open) return message.channel.send("Er is momenteel geen plek om te joinen. Kijk anders in #wachtlijst")
    if(!args[0] || !args[1]) return message.channel.send(`Gebruik ${botConfig.prefix}join [naam] [dag]`);
    var naam = args[0];
    var dag;
    if(args[1].toLowerCase() === "ma" ||args[1].toLowerCase() === "maandag"){
        if(message.guild.roles.cache.find(role => role.name === "Maandag" == null)) return message.channel.send("Op deze dag is geen Grandprix. Kies een andere dag.");
        dag = "Maandag";
    } else if(args[1].toLowerCase() === "di" ||args[1].toLowerCase() === "dinsdag"){
        if(message.guild.roles.cache.find(role => role.name === "Dinsdag" == null)) return message.channel.send("Op deze dag is geen Grandprix. Kies een andere dag.");
        dag = "Dinsdag";
    } else if(args[1].toLowerCase() === "wo" ||args[1].toLowerCase() === "woensdag"){
        if(message.guild.roles.cache.find(role => role.name === "Woensdag" == null)) return message.channel.send("Op deze dag is geen Grandprix. Kies een andere dag.");
        dag = "Woensdag";
    } else if(args[1].toLowerCase() === "do" ||args[1].toLowerCase() === "donderdag"){
        if(message.guild.roles.cache.find(role => role.name === "Donderdag" == null)) return message.channel.send("Op deze dag is geen Grandprix. Kies een andere dag.");
        dag = "Donderdag";
    } else if(args[1].toLowerCase() === "vr" ||args[1].toLowerCase() === "vrijdag"){
        if(message.guild.roles.cache.find(role => role.name === "Vrijdag" == null)) return message.channel.send("Op deze dag is geen Grandprix. Kies een andere dag.");
        dag = "Vrijdag";
    } else if(args[1].toLowerCase() === "za" ||args[1].toLowerCase() === "zaterdag"){
        if(message.guild.roles.cache.find(role => role.name === "Zaterdag" == null)) return message.channel.send("Op deze dag is geen Grandprix. Kies een andere dag.");
        dag = "Zaterdag";
    } else if(args[1].toLowerCase() === "zo" ||args[1].toLowerCase() === "zondag"){
        if(message.guild.roles.cache.find(role => role.name === "Zondag" == null)) return message.channel.send("Op deze dag is geen Grandprix. Kies een andere dag.");
        dag = "Zondag";
    } else return message.channel.send(`Je hebt geen bestaande dag in getypt.`);
    console.log((message.member.roles.cache.find(r => r.name === dag)).id)
    if(message.member.roles.cache.find(r => r.name === dag)) return message.reply("Je doet al mee aan deze race.");
    if(guild.roles.cache.get((message.member.roles.cache.find(r => r.name === dag)).id).members.size < 20){
        let member = message.member;
        member.roles.add((guild.roles.cache.get(message.member.roles.cache.find(r => r.name === dag)).id));
    } else return message.channel.send("Aanmelding mislukt. Het maximaal aantal mensen doet al mee. Je kan nog mee doen in #wachtlijst of in een andere GrandPrix");


    message.channel.send(`Aanmelding Voltooid.\n~~---------------------------~~\n**F1 GrandPrix ${dag}**\n**Naam:** ${naam} \n**Mensen die meedoen: **${membercount}/20`)
    var textchan = message.member.guild.channels.cache.find(channels => channels.name === "f1-aanmeldingen");
    textchan.send(`**Aanmelding**\n**Dag:** ${dag}\n**Naam:** ${naam} (${message.author})\n(${membercount}/20)`).then(async msg => {;
    msg.react("✅")
    })
}

module.exports.help = {
    name: 'ajoin',
    desc: "Alpha Join een F1 Seizoen.",
    cat: "Hide"
}