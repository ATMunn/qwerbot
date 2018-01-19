const commands = require("../commands.js");

commands.newCommand("ping", "general", (bot,msg)=>{
    msg.reply("pong");
});
