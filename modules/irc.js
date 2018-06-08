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

    commands.newCommand("op", "chanop", "control", (bot,msg)=>{
        let nick = (msg.cargs.length > 0?msg.cargs[0]:msg.nick);
        bot.mode((msg.cargs.length > 1?msg.cargs[1]:msg.channel), "+o", nick);
    }, "Ops a user in a channel, or the current channel if none is specified. User defaults to the one running the command. Usage: 'op [user] [channel]'")

    commands.newCommand("deop", "chanop", "control", (bot,msg)=>{
        let nick = (msg.cargs.length > 0?msg.cargs[0]:msg.nick);
        bot.mode((msg.cargs.length > 1?msg.cargs[1]:msg.channel), "-o", nick);
    }, "Deops a user in a channel, or the current channel if none is specified. User defaults to the one running the command. Usage: 'deop [user] [channel]'")

    commands.newCommand("voice", "chanop", "control", (bot,msg)=>{
        let nick = (msg.cargs.length > 0?msg.cargs[0]:msg.nick);
        bot.mode((msg.cargs.length > 1?msg.cargs[1]:msg.channel), "+v", nick);
    }, "Voices a user in a channel, or the current channel if none is specified. User defaults to the one running the command. Usage: 'voice [user] [channel]'")

    commands.newCommand("unvoice", "chanop", "control", (bot,msg)=>{
        let nick = (msg.cargs.length > 0?msg.cargs[0]:msg.nick);
        bot.mode((msg.cargs.length > 1?msg.cargs[1]:msg.channel), "-v", nick);
    }, "Unvoices a user in a channel, or the current channel if none is specified. User defaults to the one running the command. Usage: 'unvoice [user] [channel]'")
    return module.exports;
}

function exit() {
    console.log("Unloaded irc.js");
}
