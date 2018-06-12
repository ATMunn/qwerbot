const fs = require("fs");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function pickRandom(choices) {
    return choices[getRandomInt(0, choices.length)]
}

module.exports = {init, exit};

function init(commands) {
    console.log("Loaded fun.js");

    commands.newCommand("shrug", "fun", "fun", (bot,msg)=>{
        bot.msg(msg.channel, "¯\\_(ツ)_/¯");
    }, "shrugs");

    commands.newCommand("rand", "fun", "fun", (bot,msg)=>{
        if (msg.cargs.length != 0) {
            if (!isNaN(msg.cargs[0]) && !isNaN(msg.cargs[1])) {
                msg.reply(getRandomInt(msg.cargs[0], msg.cargs[1]));
            }
            else {
                msg.reply("Please provide integer numbers.");
            }
        }
        else {
            msg.reply("Please specify both a minimum and maximum number.");
        }

    }, "Returns a random integer within a range. Usage: 'rand <min> <max>'");

    commands.newCommand("randpick", "fun", "fun", (bot,msg)=>{
        if (msg.cargs.length != 0) {
            msg.reply(pickRandom(msg.cargs));
        }
        else {
            msg.reply("Please specify a list of choices.");
        }
    }, "Returns a random choice out of a list of space-separated choices. Usage: 'randpick <choices>'");

    commands.newCommand("attack", "fun", "fun", (bot,msg)=>{
        victim = (msg.cargs.length == 0?msg.nick:msg.cargs.join(" "));
        bot.action(msg.channel, pickRandom(JSON.parse(fs.readFileSync("./responses.json", "utf-8")).attacks));
    }, "Attacks a selected victim. Usage: 'attack [victim]'");

    return module.exports;
}

function exit() {
    console.log("Unloaded fun.js");
}