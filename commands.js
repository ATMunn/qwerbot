const jf = require("jsonfile");

let modul3s = ["general", "irc"]; //idk
var loaded_modules = [];

let commands = Object.create(null);

let groups = Object.create(null);

module.exports = {parseCommands, newCommand, reload, listGroups, listCmdsInGroup, getCmdHelp};

function newCommand(name, group, permGroup, func, help = "No help provided.") {
    commands[name] = {
        "group": group,
        "permGroup": permGroup,
        "function": func,
        "help": help,
    };
    if (!groups[group]) {
        groups[group] = [];
    }
    groups[group].push(name)
}

function listGroups() {
    return Object.keys(groups);
}

function listCmdsInGroup(group) {
    return !!groups[group]?groups[group]:false;
}

function getCmdHelp(cmd) {
    return !!commands[cmd]?commands[cmd].help:false; //ternary ftw
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
    groups = {};
    if (loaded_modules.length > 0) {
        for (var mod in loaded_modules) {
            try {
                mod.exit();
            } catch (e) {}
        }
        loaded_modules = [];
    }
    for (var mod in modul3s) {
        delete require.cache[require.resolve("./modules/"+modul3s[mod]+".js")];
        loaded_modules.push(require("./modules/"+modul3s[mod]+".js").init(module.exports));
    }
}

reload();
