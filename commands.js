let modul3s = ["general"]; //idk

let commands = {};

function newCommand(name, group, func, help = "No help provided.") {
    commands[name] = {
        "group": group,
        "function": func,
        "help": help,
    };
}

function parseCommands(bot, msg) {
    for(let cmd in commands) {
        if(msg.bcmd == cmd) {
            commands[cmd].function(bot, msg);
        }
    }
}

module.exports = {parseCommands, newCommand};

// import the other modules

for (var mod in modul3s) {
    require("./modules/"+modul3s[mod]+".js");
}
