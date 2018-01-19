let modules = [];

let commands = {};

for(let mod in modules) {
    require("./modules/"+mod+".js")
}

function newCommand(name, group, func, help = "No help provided.") {
    commands[name] = {
        "group": group,
        "function": func,
        "help": help,
    };
};

function parseCommands(bot, user, channel, command, args, raw) {
    for(let cmd in commands) {
        if(command = cmd) {
            commands.cmd(bot, user, channel, args, raw)
        }
    }
};

module.exports = {parseCommands, newCommand};