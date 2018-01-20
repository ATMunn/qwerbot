const cfgfile = require("./config.js");
const commands = require("./commands.js");

function parseData(data, bot) {
    let msg = {"raw": data.toString().replace(/[\r\n]*/g,"")};
    msg.parts = msg.raw.split(" ");
    console.log(msg.raw); //look at my amazing logging system
    if(msg.parts[0] == "PING") {
        bot.send("PONG "+msg.parts[1]);
    }
    else {

        //yes, I know this is very messy. no, I don't care.

        msg.user = {"full": msg.parts[0].replace(/[:~]*/g,"")};
        msg.user.nick = msg.user.full.split("!")[0],
        msg.user.ident = msg.user.full.split("!")[1].split("@")[0],
        msg.user.hostmask = msg.user.full.split("!")[1].split("@")[1]
        msg.cmd = msg.parts[1];
        msg.args = msg.parts.slice(2);
    }
    if(msg.cmd == "PRIVMSG") {
        msg.channel = msg.args[1];
        msg.privmsg = msg.args[2].replace(":","");
        msg.reply = replymsg=>bot.msg(msg.channel,msg.nick+": "+replymsg);
        if(msg.privmsg[0] == cfgfile.cmdchar) {
            msg.bcmd = msg.privmsg.split(" ").replace(cfgfile.cmdchar,"") //bcmd = bot command
            msg.cargs = msg.privmsg.split(" ").slice(1);
            commands.parseCommands(bot, msg);
        }
    }
}
module.exports = parseData;

