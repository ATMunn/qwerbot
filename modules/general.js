const commands = require("../commands.js");
console.log(commands)

commands.newCommand("ping", "general", (bot,user,channel)=>{
    bot.msg(channel,"pong");
    console.log("it worked lol")
})