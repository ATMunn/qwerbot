const fs = require("fs");

let pswd = fs.readFileSync("password.txt");

let botconfig = {
    "port": 6697,
    "host": "irc.freenode.net",
    "nick": "qwerbot",
    "ident": "bot",
    "password": pswd,
    "realname": "test bot"
};

let cmdchar = "^";

let autojoin = ["##lazy-valoran", "##atmunn"]

module.exports = {botconfig, cmdchar,autojoin};
