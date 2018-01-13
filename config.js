const rls = require("readline-sync");

let pswd = rls.question("Please enter the password for the bot's account: ", {hideEchoBack: true})


let config = {
    "port": 6697,
    "host": "irc.freenode.net",
    "nick": "qwerbot",
    "ident": "bot",
    "password": pswd,
    "realname": "test bot"
}