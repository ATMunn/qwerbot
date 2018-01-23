module.exports = {init, exit};

function init(commands) {
    console.log("hiya");

    commands.newCommand("ping", "general", "general", (bot,msg)=>{
        msg.reply("pong");
    }, "Replies with \"ping\". Useful for checking if the bot is still functioning.");

    commands.newCommand("reload", "general", "general-admin", (bot,msg)=>{
        commands.reload();
        msg.reply("Reloaded modules.");
    }, "Reloads the bot's modules.");

    return module.exports;
}

function exit() {
    console.log("cleanup time!");
}
