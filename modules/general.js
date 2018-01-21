const commands = require("../commands.js");

commands.newCommand("ping", "general", "general", (bot,msg)=>{
    msg.reply("pong");
}, "Replies with \"ping\". Useful for checking if the bot is still functioning.");

commands.newCommand("reload", "general", "general-admin", (bot,msg)=>{
    commands.reload();
    msg.reply("Reloaded modules.")
}, "Reloads the bot's modules.");
