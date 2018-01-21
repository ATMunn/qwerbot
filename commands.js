const jf = require("jsonfile");

let modul3s = ["general"]; //idk

let commands = {};

function newCommand(name, group, permGroup, func, help = "No help provided.") {
    commands[name] = {
        "group": group,
        "permGroup": permGroup,
        "function": func,
        "help": help,
    };
}

function checkPerms(hostmask, command) {
    let permGroup = commands[command].permGroup;
    let permissions = jf.readFileSync("./permissions.json");
    if(permissions.users[hostmask].admin || permissions.groups[permGroup] === "anyone") {
        return true;
    }
    else if(permissions.groups[permGroup] === "restricted") {
        if (permissions.users[hostmask][permGroup]) {
            return true;
        }
        else {
            return "noperms";
        }
    }
    else {
        return "notadmin"
    }
}

function parseCommands(bot, msg) {
    for(let cmd in commands) {
        if(msg.bcmd == cmd) {
            let canExec = checkPerms(msg.hostmask, commands[cmd].permGroup)
            if(canExec === true) {
                commands[cmd].function(bot, msg);
            }
            else if(canExec === "noperms") {
                msg.reply("Sorry, you do not have permissions to use the command \""+cmd+"\".")
            }
            else if(canExec === "notadmin") {
                msg.reply("Sorry, the command \""+cmd+"\" is an admin-only command.")
            }
            else {
                msg.reply("You should not see this message. If you do, something has gone wrong...")
            }
        }
    }
}

module.exports = {parseCommands, newCommand};

// import the other modules

for (var mod in modul3s) {
    require("./modules/"+modul3s[mod]+".js");
}
