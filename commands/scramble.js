const { rword } = require("rword");
const { words } = require("./words.json")
module.exports = {
    
    name : 'scramble',
    description: 'Attempt to unscramble the given scrambled word',

    run : async(client, message, args) => {
        if(!message.guild.me.permissions.has(['SEND_MESSAGES'])) return;
        let word = words[parseInt(Math.random() * words.length)];
        //word = rword.generate();
        console.log(word);

        let scrambled = word.split('');
    
        scrambled.sort(() => (Math.random() > .5) ? 1 : -1);

        while(scrambled.join('') == word) scrambled.sort(() => (Math.random() > .5) ? 1 : -1);

        message.channel.send(`Your word is... \`${scrambled.join('')}\`! Unscramble the given word.`);
        
        const filter = msg => msg.author.id == message.author.id;
        
        const collector = message.channel.createMessageCollector({ filter, time: 60000, max: 1 })

        collector.on('collect', async(msg) => {
            if(msg.content.toLowerCase() == word.toLowerCase()) return message.channel.send(`That's correct! Good job!`);
            else return message.channel.send(`That's incorrect. Better luck next time :/`);
        });

        collector.on('end', async(collected) => {
            if(collected.size == 0) message.channel.send(`You timed out! Respond quicker next time.`);
        });
    }
};