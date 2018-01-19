const commands = require("commands");

commands.newCommand("ping", "general", (bot,user,channel)=>{
    bot.msg(channel,"pong");
    console.log("it worked lol")
})