const cfgfile = require("./config.js");
const commands = require("./commands.js");

function parseData(data, bot) {
    data = data.toString().replace(/[\r\n]*/g,"");
    let parts = data.split(" ");
    console.log(data); //look at my amazing logging system
    if(parts[0] == "PING") {
        bot.send("PONG "+parts[1]+"\n");
    }
    if(parts[1] == "PRIVMSG") {
        let msg = parts[3].replace(":","");
        if(msg[0] == cfgfile.cmdchar) {
            commands.parseCommands(
                bot, 
                parts[0], 
                parts[2], 
                msg.split(" ")[0].replace(cfgfile.cmdchar, ""), 
                msg.split(" ").slice(1),
                data
            );
        }
    }
}
module.exports = parseData;