const cp = require("child_process");

module.exports = {init, exit};

function init(commands) {
    console.log("Loaded general.js");

    commands.newCommand("ping", "general", "general", (bot,msg)=>{
        msg.reply("pong");
    }, "Replies with \"pong\". Useful for checking if the bot is still functioning.");

    commands.newCommand("reload", "general", "general-admin", (bot,msg)=>{
        commands.reload();
        msg.reply("Reloaded modules.");
    }, "Reloads the bot's modules.");

    commands.newCommand("help", "general", "general", (bot,msg)=>{
        if(msg.cargs.length == 0)
            msg.reply("Please specify a command to get help on it. If you are looking for a list of all commands, use list instead.");
        else {
            let help = commands.getCmdHelp(msg.cargs[0]);
            if(help)
                msg.reply("Help for \""+msg.cargs[0]+"\": "+help);
            else
                msg.reply("That command does not seem to exist. :(");
        }
    }, "Gets help on a specific command. Usage: 'help <command>'");

    commands.newCommand("list", "general", "general", (bot,msg)=>{
        if(msg.cargs.length == 0)
            msg.reply("List of all groups: "+commands.listGroups().join(", ")+" (For a list of commands in a specific group, use 'list [group]')");
        else {
            let cmds = commands.listCmdsInGroup(msg.cargs[0]);
            if(cmds)
                msg.reply("List of commands in group \""+msg.cargs[0]+"\": "+cmds.join(", "));
            else
                msg.reply("That group does not seem to exist. :(");
        }
    }, "Lists all commands in a specific group, or lists all groups if none is specified. Usage: 'list [group]'");

    commands.newCommand("restart", "general", "general-admin", (bot,msg)=> {
        let reason = msg.cargs[0]?msg.cargs[0]:"No reason provided";
        bot.send("QUIT :Restarted by "+msg.nick+": \""+reason+"\"");
        process.exit(0); //lazy restart, in order to make it work, the bot needs to be run by a wrapper that auto-restarts
    }, "Restarts the bot. Usage: 'restart [reason]'");

    commands.newCommand("update", "general", "general-admin", (bot,msg)=> {
        let reply = cp.execSync("git pull").toString();
        if(reply.startsWith("Already up-to-date.")) 
            msg.reply("Already up to date.");
        else
            msg.reply("Pulled latest commit from git");
    }, "Runs 'git pull'.");

    return module.exports;
}

function exit() {
    console.log("Unloaded general.js");
}
