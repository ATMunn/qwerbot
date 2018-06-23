const fs = require("fs");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function pickRandom(choices) {
    return choices[getRandomInt(0, choices.length)]
}

let generateTemplateString = (function() {
    let cache = {};

    function generateTemplate(template){
        let fn = cache[template];

        if (!fn) {  
            // Replace ${expressions} (etc) with ${map.expressions}
            let sanitized = template
                .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, function(_, match){
                    return `\$\{map.${match.trim()}\}`;
                    })
                // Afterwards, replace anything that's not ${map.expressions}' (etc) with a blank string.
                .replace(/(\$\{(?!map\.)[^}]+\})/g, '');
            
            fn = Function('map', `return \`${sanitized}\``);
        }

    return fn;
    };

    return generateTemplate;
})(); //Thank you very much to Bryan Rayner for this function code.

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
        let victim = (msg.cargs.length == 0?msg.nick:msg.cargs.join(" "));
        let message = generateTemplateString(pickRandom(JSON.parse(fs.readFileSync("modules/responses.json", "utf-8")).attacks));
        bot.action(msg.channel, message({victim: victim}));
    }, "Attacks a selected victim. Usage: 'attack [victim]'");

    return module.exports;
}

function exit() {
    console.log("Unloaded fun.js");
}