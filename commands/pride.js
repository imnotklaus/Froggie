const phin = require('phin')
const { MessageEmbed, MessageAttachment } = require('discord.js')
module.exports = {
name: "pride",
aliases: "gaypfp",
async run(client, message, args) {

    let member = message.author

    let av = `https://some-random-api.ml/canvas/lgbt?avatar=${member.avatarURL({ size: 4096, dynamic: true,format: 'png' })}`    

    const res = await phin(av) //basically the image url

if (res.statusCode !== 200) { //check if it isnt 200 OK
        console.log(JSON.parse(res.body)) //console.log the error
        message.channel.send(`Welcome ${member.user.username}\n\nError: ${(JSON.parse(res.body)).error}`) //send error message
        return
    }
    let attachment = new MessageAttachment(res.body, 'join.png') //make attachment using the buffer
    message.channel.send({ files: [attachment]}); //send attachment
}
}