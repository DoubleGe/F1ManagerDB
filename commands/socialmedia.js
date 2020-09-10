const discord = require("discord.js");
const lang = require("../lang.json");

module.exports.run = async (bot, message, args) => {

    if(!args[0]) message.channel.send("Gebruik !social Insta/Twitter/Facebook/Youtube/forum");

    if(args[0].toLowerCase() === "insta" || args[0].toLowerCase() === "instagram") return message.channel.send("**Instagram:** https://www.instagram.com/nonlabelracing/?hl=nl");
    else if(args[0].toLowerCase() === "twitter") return message.channel.send("**Twitter:** https://twitter.com/nonlabelracing");
    else if (args[0].toLowerCase() === "face" || args[0].toLowerCase() === "facebook") return message.channel.send("**FaceBook:** https://www.facebook.com/nonlabelracing/");
    else if (args[0].toLowerCase() === "yt" || args[0].toLowerCase() === "youtube") return message.channel.send("**YouTube:** https://www.facebook.com/nonlabelracing/");
    else if (args[0].toLowerCase() === "forum") return message.channel.send("**Forum:** http://www.nonlabelracing.nl/forum/");
    else if (args[0].toLowerCase() === "web" || args[0].toLowerCase() === "website") return message.channel.send("**Website:** https://www.nonlabelracing.nl/")
}

module.exports.help = {
    name: 'social',
    desc: "Ik laat socialmedia zien van NLR.",
    cat: "F1"
}