module.exports.run = async (client, message, args, settings, con) => {
  message.channel.send("Invite me with this link!\n**https://card-bot.github.io/invite** or **https://cardbot.glitch.me/invite**");
}


module.exports.help = {
    name: "inviteme",
    usage: "Gets an invite link to add me to your server!"
}
