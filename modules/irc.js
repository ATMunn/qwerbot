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
            bot.msg(msg.cargs[0], msg.cargs.slice(1).join(" "));
        }
        else {
            msg.reply("Please specify both a target and a message.");
        }
    }, "Sends a message to a channel or user. Usage: 'msg <target> <message>");

    commands.newCommand("join", "irc", "control", (bot,msg)=>{
        if(msg.cargs.length != 0) {
            bot.join(msg.cargs[0]);
        }
        else {
            msg.reply("Please specify a channel.");
        }
    }, "Makes the bot join a channel. Usage: 'join <channel>'");

    commands.newCommand("part", "irc", "control", (bot,msg)=>{
        if(msg.cargs.length != 0) {
            bot.part(msg.cargs[0]);
        }
        else {
            msg.reply("Please specify a channel.");
        }
    }, "Makes the bot part a channel. Usage: 'part <channel>'");

    commands.newCommand("op", "irc", "chanop", (bot,msg)=>{
        let nick = (msg.cargs.length > 0?msg.cargs[0]:msg.nick);
        bot.mode(msg.channel, "+o", nick);
    }, "Ops  User defaults to the one running the command. Usage: 'op [user]'");

    commands.newCommand("deop", "irc", "chanop", (bot,msg)=>{
        let nick = (msg.cargs.length > 0?msg.cargs[0]:msg.nick);
        bot.mode(msg.channel, "-o", nick);
    }, "Deops a user in the current channel. User defaults to the one running the command. Usage: 'deop [user]'");

    commands.newCommand("voice", "irc", "chanop", (bot,msg)=>{
        let nick = (msg.cargs.length > 0?msg.cargs[0]:msg.nick);
        bot.mode(msg.channel, "+v", nick);
    }, "Voices a user in the current channel. User defaults to the one running the command. Usage: 'voice [user]'");

    commands.newCommand("unvoice", "irc", "chanop", (bot,msg)=>{
        let nick = (msg.cargs.length > 0?msg.cargs[0]:msg.nick);
        bot.mode(msg.channel, "-v", nick);
    }, "Unvoices a user in the current channel. User defaults to the one running the command. Usage: 'unvoice [user]'");

    commands.newCommand("action", "irc", "chanop", (bot,msg)=>{
        let action = msg.cargs.join(" ").replace("\u0001", "");
        bot.action(msg.channel, action);
    }, "Sends text as a /me command in the current channel. Usage: 'action <text>'");
    return module.exports;
}

function exit() {
    console.log("Unloaded irc.js");
}
