const discord = require("discord.js"); //(NPM START)
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir('./commands/', (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Geen files gevonden.");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`File ${f} is geladen.`);

        bot.commands.set(fileGet.help.name, fileGet);

    })

});

bot.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get('740220137629548585');

    if (!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get('740213495416750151');

    if (!channel) return;

    channel.send(`Welkom op de server ${member}!\nGebruik !join [naam] [dag] om je aantemelden voor een GrandPrix.`);

})

bot.on("guildMemberRemove", member => {
    var channel = member.guild.channels.cache.get('709070032063430716');

    if (!channel) return;

    channel.send(`${member} heeft de server verlaten. \nWij gaan je missen!`);
})

bot.login(process.env.token);

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);

    bot.user.setActivity("Version " + botConfig.version, { type: "PLAYING" });

    // var channel = bot.channels.cache.get('740213495416750151'); //F1 PC
    // channel.send("**Update 1.1.0!:tada:**\n**1.** Verbeteringen aanmeld command.\n**2.** F1Count command added.\n**3.** F1ucount command added.");
    //1.** Verbeteringen aanmeld command.\n**2.** F1Count command added.\n**3.** F1ucount command added. (1.1)
});

bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type == "dm") return;



    // var msg = message.content.toLowerCase();

    // for (let i = 0; i < controlWords["controlWords"].length; i++) {

    //     if (msg.includes(controlWords["controlWords"][i])) {

    //         message.delete();
    //         return message.reply("Je hebt een woord gezegd wat niet toegestaan is :rage:").then(msg => msg.delete({ timeout: 4000 }));
    //     }
    // }

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var controlWords = JSON.parse(fs.readFileSync("./data/controlWords.json"))

    var sentenceUser = "";
    var amountControlWords = 0;

    for (let y = 0; y < messageArray.length; y++) {
        const word = messageArray[y].toLowerCase();
        
        var changeWord = "";
        for (let i = 0; i < controlWords["controlWords"].length; i++){
            if (word.includes(controlWords["controlWords"][i])) {
                changeWord = word.replace(controlWords["controlWords"][i], "Bobba");
                sentenceUser += " " + changeWord;

                amountControlWords++;
            }

        }
        if(!changeWord){
            sentenceUser+= " " + messageArray[y]; 
        }
    }

    if(amountControlWords != 0){
        message.delete();
        message.channel.send(sentenceUser).then(msg => msg.delete({timeout: 5000}))
        message.channel.send("Gebruik deze taal niet.").then(msg => msg.delete({timeout: 5000}))
    }

    var command = messageArray[0].toLowerCase();

    if (!message.content.startsWith(prefix)) return;

    var args = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));

    if (commands) commands.run(bot, message, args);
});

