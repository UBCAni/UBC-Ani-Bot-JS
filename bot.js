require('dotenv').config();

const { Client, Intents, MessageAttachment } = require('discord.js');
const Canvas = require('canvas');

const bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"] });


var canvas = {};
canvas.create = Canvas.createCanvas(1920, 1080);
canvas.context = canvas.create.getContext('2d');
canvas.context.font = '72px sans-serif';
canvas.context.fillStyle = '#000000'


bot.login(process.env.DISCORDJS_BOT_TOKEN);

bot.on('message', (message) => {
    if (message.author.bot) return;
    console.log(".");
    if (message.content.toLowerCase() === 'hello') {
        message.channel.send('hello there!');
    }
    if (message.content.toLowerCase() === "hi") {
        message.channel.send('hi, there!');
    }
});


Canvas.loadImage("./src/welcome.png").then(async (img) => {
    canvas.context.drawImage(img, 0, 0, 1920, 1080);
    canvas.context.beginPath();
    canvas.context.arc(960, 260, 250, 0, Math.PI * 2, true);
    canvas.context.stroke();
    canvas.context.fill();
})


bot.on('guildMemberAdd', async member => {
    console.log("joined");
    const channel = bot.channels.cache.find(ch => ch.id === '173628002029010944');
    canvas.context.font = '42px sans-serif',
        canvas.context.textAlign = 'center';
    canvas.context.beginPath();
    canvas.context.arc(960, 260, 240, 0, Math.PI * 2, true);
    canvas.context.closePath();
    canvas.context.clip();
    await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg', size: 1024 })).then(async (img) => {
        canvas.context.drawImage(img, 720, 20, 480, 480);
    })
    let atta = new MessageAttachment(canvas.create.toBuffer(), `welcome-${member.id}.png`);
    try {
        channel.send(`Hello ${member}, welcome to ${member.guild.name}! Make sure to check ${member.guild.channels.cache.get('244434657414873090')} and ${member.guild.channels.cache.get('892612995891466270')}! Feel free to DM an exec if you have any questions!
        `);
        channel.send({ files: [atta] });
    } catch (error) {
        console.log(error);
        channel.send("error logged");
    }

});

