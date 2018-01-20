const cfgfile = require("./config.js");
const commands = require("./commands.js");

function parseData(data, bot) {
    let msg = {"raw": data.toString().replace(/[\r\n]*/g,"")};
    msg.parts = msg.raw.split(" ");
    console.log(msg.raw); //look at my amazing logging system
    let regex = /:(~?(.+)!(.+)@(.+)) ([A-Z]+) ([^:]+) :?(.+)?/;
    if(regex.test(msg.raw)) {
        let matches = regex.exec(msg.raw);

        msg.user = matches[1];
        msg.user.nick = matches[2];
        msg.user.ident = matches[3];
        msg.user.hostmask = matches[4];
        msg.cmd = matches[5];
        msg.args = matches[6].split(" ");
        msg.longarg = matches[7]
    }
    else if(/PING (.+)/.test(msg.raw)) {
        bot.send("PONG "+msg.parts[1])
    }
    if(msg.cmd == "PRIVMSG") {
        msg.channel = msg.args[0];
        msg.reply = replymsg=>bot.msg(msg.channel,msg.nick+": "+replymsg);
        if(msg.longarg[0] == cfgfile.cmdchar) {
            msg.bcmd = msg.longarg.split(" ")[0].replace(cfgfile.cmdchar,"") //bcmd = bot command
            msg.cargs = msg.longarg.split(" ").slice(1); //cargs = command args
            commands.parseCommands(bot, msg);
        }
    }
}
module.exports = parseData;