require("dotenv").config();
const { Client, GatewayIntentBits } = require('discord.js');

const bot = new Client({
  intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers]
});


bot.login(process.env.DISCORDJS_BOT_TOKEN);

bot.on('messageCreate', (message) => {
  if (message.author.bot) return;
  console.log(".");
  if (message.content.toLowerCase() === 'specops') {
    message.channel.send('hello there!');
  }
  if (message.content.toLowerCase() === "undercovershiani") {
    message.channel.send('hi, there!');
  }
});
