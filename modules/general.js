const commands = require("../commands.js");

commands.newCommand("ping", "general", (bot,user,channel)=>{
    bot.msg(channel,"pong");
});
