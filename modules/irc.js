module.exports = {init, exit};

function init(commands) {
    console.log("Loaded irc.js");

    commands.newCommand("raw", "irc", "control", (bot,msg)=>{
        bot.send(msg.cargs.join(" "));
    }, "Sends raw IRC data. Usage: 'raw <data>'");

    commands.newCommand("msg", "irc", "control", (bot,msg)=>{
        bot.msg(msg.cargs[0], msg.cargs.slice(1).join(" "))
    })

    commands.newCommand("join", "irc", "control", (bot,msg)=>{
        bot.join(msg.cargs[0])
    })

    return module.exports;
}

function exit() {
    console.log("Unloaded irc.js");
}
