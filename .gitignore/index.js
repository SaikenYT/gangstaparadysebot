const Discord = require('discord.js');
const got = require('got');
const api = 'dc6zaTOxFJmzC';
const client = new Discord.Client();

var prefix = "*";

client.login("NDczNTUyNzQ0MDM3MjIwMzUy.DkDvVA.YNHWOCyRidXBkILK6wyjs9sliWI");

client.on("ready", () => {
    console.log("Je suis prêt!");
    client.user.setGame("Tuer le karma");
});

client.on('message', async msg => {
    const args = msg.content.split(" ").slice(1);

    if (msg.content.toLowerCase().startsWith("^gif")) {      
        if (args.length < 1) return msg.channel.send('-Text is a required argument', {code: "py"})
        const res = await got(`http://api.giphy.com/v1/gifs/random?api_key=${api}&tag=${encodeURIComponent(args.join(" "))}`, {json: true})
        if (!res || !res.body || !res.body.data) return msg.channel.send("@Failed to find a GIF that matched your quary!", {code: "py"})

        const embed = new Discord.RichEmbed()
        .setImage(res.body.data.image_url)
        .setAuthor(msg.author.tag, msg.author.displayAvatarIRL)

        msg.channel.send({embed: embed});
    }
});
