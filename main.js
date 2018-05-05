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
        this.socket.once("connect",() => {
            self.socket.write(`NICK ${config.nick}\r\n`);
            self.socket.write(`USER ${config.ident} * 8 :${config.realname}\r\n`);
            self.socket.write(`NS ID ${config.password}\r\n`);
        });
        this.socket.on("data", data=>parse(data, this));
        this.msgQueue = [];
        this.canBurst = true;
        setInterval(_=>{
            if(this.msgQueue.length == 0) {
                this.canBurst = true;
            }
            else if(this.canBurst) {
                let sendCount = this.msgQueue.length >= 5?5:this.msgQueue.length;
                for(let i=0; i <= sendCount; i++) {
                    let text = this.msgQueue.shift();
                    if(typeof text == "string") { //idk what causes it to not be, but node complains
                        this.socket.write(`${text}\r\n`);
                        console.log(`[SEND] ${text.replace(/[\r\n]*/g,"")}`);
                        this.canBurst = false;
                    }
                }
            }
            else {
                let text = this.msgQueue.shift();
                if(typeof text == "string") { //idk what causes it to not be, but node complains
                    this.socket.write(`${text}\r\n`);
                    console.log(`[SEND] ${text.replace(/[\r\n]*/g,"")}`);
                    this.canBurst = false;
                }
            }
        }, 700);
    }
    send(text) {
        this.msgQueue.push(text);
    }
    msg(channel, text) {
        if(!text.includes("\r\n")){
            this.send(`PRIVMSG ${channel} :${text}`);
        }
        else {
            let msgs = text.split("\r\n");
            for(let i=0;i<msgs.length;i++) {
                this.send(`PRIVMSG ${channel} :${msgs[i]}`);
            }
        }
    }
    join(channel) {
        this.send(`JOIN ${channel}`);
    }
    part(channel) {
        this.send(`JOIN ${channel}`);
    }
    mode(channel, mode, nick) {
        this.send(`MODE ${channel} ${mode} ${typeof nick == "undefined" ? "" : nick}`)
    }
}

let bot = new IRCBot(cfgfile.botconfig);
bot.connect();
setTimeout(_=>{
    for(let i=0;i<cfgfile.autojoin.length;i++) {
        bot.join(cfgfile.autojoin[i]);
    }
}, 8000);
