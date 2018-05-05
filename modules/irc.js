module.exports = {init, exit};

function init(commands) {
    console.log("Loaded irc.js");

    commands.newCommand("raw", "irc", "control", (bot,msg)=>{
        if(msg.cargs.length != 0) {
            bot.send(msg.cargs.join(" "));
        }
        else {
            msg.reply("Please specify data to send.")
        }
    }, "Sends raw IRC data. Usage: 'raw <data>'");

    commands.newCommand("msg", "irc", "control", (bot,msg)=>{
        if(msg.cargs.length >= 2) {
            bot.msg(msg.cargs[0], msg.cargs.slice(1).join(" "))
        }
        else {
            msg.reply("Please specify both a target and a message.")
        }
    }, "Sends a message to a channel or user. Usage: 'msg <target> <message>")

    commands.newCommand("join", "irc", "control", (bot,msg)=>{
        if(msg.cargs.length != 0) {
            bot.join(msg.cargs[0])
        }
        else {
            msg.reply("Please specify a channel.")
        }
    }, "Makes the bot join a channel. Usage: 'join <channel'")

    commands.newCommand("part", "irc", "control", (bot,msg)=>{
        if(msg.cargs.length != 0) {
            bot.part(msg.cargs[0])
        }
        else {
            msg.reply("Please specify a channel.")
        }
    }, "Makes the bot part a channel. Usage: 'part <channel'")

    commands.newCommand("op", "irc", "control", (bot,msg)=>{
        if(msg.cargs.length != 0) {
            bot.mode(msg.cargs.length > 1?msg.cargs[1]:msg.channel, "+o", msg.cargs[0]);
        }
        else{
            msg.reply("Please specify a nick.")
        }
    }, "Ops a user in a channel, or the current channel if none is specified. Usage: 'op <user> [channel]'")

    commands.newCommand("deop", "irc", "control", (bot,msg)=>{
        if(msg.cargs.length != 0) {
            bot.mode(msg.cargs.length > 1?msg.cargs[1]:msg.channel, "-o", msg.cargs[0]);
        }
        else{
            msg.reply("Please specify a nick.")
        }
    }, "Deops a user in a channel, or the current channel if none is specified. Usage: 'deop <user> [channel]'")

    commands.newCommand("voice", "irc", "control", (bot,msg)=>{
        if(msg.cargs.length != 0) {
            bot.mode(msg.cargs.length > 1?msg.cargs[1]:msg.channel, "+v", msg.cargs[0]);
        }
        else{
            msg.reply("Please specify a nick.")
        }
    }, "Voices a user in a channel, or the current channel if none is specified. Usage: 'voice <user> [channel]'")

    commands.newCommand("unvoice", "irc", "control", (bot,msg)=>{
        if(msg.cargs.length != 0) {
            bot.mode(msg.cargs.length > 1?msg.cargs[1]:msg.channel, "-v", msg.cargs[0]);
        }
        else{
            msg.reply("Please specify a nick.")
        }
    }, "Unvoices a user in a channel, or the current channel if none is specified. Usage: 'unvoice <user> [channel]'")
    return module.exports;
}

function exit() {
    console.log("Unloaded irc.js");
}
