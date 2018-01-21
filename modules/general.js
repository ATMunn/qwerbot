const commands = require("../commands.js");

commands.newCommand("ping", "general", "general", (bot,msg)=>{
    msg.reply("pong");
}, "Replies with \"ping\". Useful for checking if the bot is still functioning.");

commands.newCommand("test", "general", "test-group", (bot,msg)=>{
    msg.reply("yay, you have permission");
})

commands.newCommand("admincommand", "general", "admin-test", (bot,msg)=>{
    msg.reply("yay, you are an admin")
})
