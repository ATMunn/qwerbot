let modul3s = ["general"]; //idk

let commands = {};

function newCommand(name, group, func, help = "No help provided.") {
    commands[name] = {
        "group": group,
        "function": func,
        "help": help,
    };
}

function parseCommands(bot, user, channel, command, args, raw) {
    for(let cmd in commands) {
        if(command == cmd) {
            commands[cmd](bot, user, channel, args, raw);
        }
    }
}

module.exports = {parseCommands, newCommand};

// import the other modules

for (var mod in modul3s) {
    require("./modules/"+modul3s[mod]+".js");
}
