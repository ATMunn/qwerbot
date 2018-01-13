function askforpassword(nick) {
    console.log("Please enter the password for the nickname "+nick+":");
    return readline();
}

let config = {
    "port": 6697,
    "host": "irc.freenode.net",
    "nick": "qwerbot",
    "ident": "bot",
    "password": askforpassword(config.nick),
    "realname": "test bot"
}