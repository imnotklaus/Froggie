const { MessageEmbed, Discord } = require('discord.js')
module.exports = {
name: "koala",
async run(client, message, args){
    if(!message.guild.me.permissions.has(['SEND_MESSAGES'])) return;
    const animal = require('animal-api')
    animal.koala(link => {
        message.channel.send(link)
    })
    },
};