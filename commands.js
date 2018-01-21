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
    let perms = jf.readFileSync("./permissions.json");
    if((perms.users[hostmask] && perms.users[hostmask].admin) || perms.groups[permGroup] === "anyone") {
        return true;
    }
    else if(perms.groups[permGroup] === "restricted") {
        if (perms.users[hostmask] && perms.users[hostmask][permGroup]) {
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
            let canExec = checkPerms(msg.hostmask, cmd)
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

function reload() {
    commands = {};
    require.cache = {};
    for (var mod in modul3s) {
        require("./modules/"+modul3s[mod]+".js");
    }
}

module.exports = {parseCommands, newCommand, reload};

reload();