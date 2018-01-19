const tls = require("tls");
const cfgfile = require("./config.js");
const parse = require("./parsing.js");

class IRCBot {
    constructor(config) {
        this.config = config;
        this.port = config.port;
        this.host = config.host;
        this.nick = config.nick;
        this.ident = config.ident;
        this.password = config.password;
        this.realname = config.realname;
    }

    connect() {
        this.socket=tls.connect(this.port, this.host);
        let self = this; //node makes me do this for some reason
	    let config = self.config;
        this.socket.once("connect",function() {
            self.socket.write("NICK "+config.nick+"\nUSER "+config.ident+" * 8 :"+config.realname+"\nNS ID "+config.password+"\n");
        });
        this.socket.on("data", data=>parse(data, this));
    }
    send(text) {
        this.socket.write(text);
        console.log("--> "+text);
    }
    msg(channel, text) {
        this.send("PRIVMSG "+channel+" :"+text);
    }
}

let bot = new IRCBot(cfgfile.botconfig);
bot.connect();
setTimeout(_=>bot.send("JOIN ##lazy-valoran \n"), 8000);
