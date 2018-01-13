function parseData(data, bot) {
    data = data.toString().replace(/[\r\n]*/g,"");
    let parts = data.split(" ");
    console.log(data) //look at my amazing logging system
    if(parts[0]=="PING") {
        bot.send("PONG"+parts[1]+"\n")
    }
}
module.exports = parseData;