const discord = require("discord.js");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    let guild = await message.guild;
    let maSize = guild.roles.cache.get((message.guild.roles.cache.find(role => role.name === "Maandag")).id).members.size;
    let woSize = guild.roles.cache.get((message.guild.roles.cache.find(role => role.name === "Woensdag")).id).members.size;
    let zoSize = guild.roles.cache.get((message.guild.roles.cache.find(role => role.name === "Zondag")).id).members.size;

    return message.channel.send(`**Maandag:** ${maSize}/20\n**Woensdag:** ${woSize}/20\n**Zondag:** ${zoSize}/20`);

}

module.exports.help = {
    name: 'f1count',
    desc: "Zie hoeveel mensen er mee doen in een Grandprix",
    cat: "F1"
}