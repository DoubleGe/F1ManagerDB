const discord = require("discord.js");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    if(!args[0]) return message.channel.send("Vul een dag in");
    var dag = "";
    if(args[0].toLowerCase() === "ma" || args[0].toLowerCase() === "maandag") dag = "Maandag";
    else if(args[0].toLowerCase() === "wo" || args[0].toLowerCase() === "woensdag") dag = "Woensdag";
    else if(args[0].toLowerCase() === "zo" || args[0].toLowerCase() === "zondag") dag = "Zondag";
    else return message.channel.send("Deze dag bestaat niet.")
    let guild = await message.guild;
    let maU = guild.roles.cache.get((message.guild.roles.cache.find(role => role.name === dag)).id).members.map(m=>m.user.tag);
    var Text = "";
    var teller = 0;
    for (let i = 0; i < maU.length; i++) {
        teller++;
        Text += `${teller}. ${maU[i]}\n`;
    }
    return message.channel.send(`**Grandprix ${dag}**\n ${Text}`);

}

module.exports.help = {
    name: 'f1ucount',
    desc: "Laat alle mensen in de GrandPrix zien.",
    cat: "F1"
}