require("dotenv").config();

var fs = require('fs');

const { Client, GatewayIntentBits } = require('discord.js');

const bot = new Client({
  intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildScheduledEvents]
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
  } if (message.content.toLowerCase() === "shianipog") {
    message.channel.send('working');

    (async () => {
      let returnString = "";
      const eventsC = await message.guild.scheduledEvents.fetch()
      //const eventsCollection = await message.guild.scheduledEvents.fetchSubscribers(eventsC);
      const [first] = eventsC.values();
      let events = await message.guild.scheduledEvents.fetchSubscribers(first);
      let values = await Array.from(events.values());
      while (values.length == 100) {
        for (let i = 0; i < values.length; i++) {
          let addit = values[i].user.id + "\n";
          returnString += addit;
        }
        let last = values[99].user.id;
        events = await message.guild.scheduledEvents.fetchSubscribers(first, { after: last });
        values = await Array.from(events.values());
      }
      for (let i = 0; i < values.length; i++) {
        let addit = values[i].user.id + "\n";
        returnString += addit;
      }
      return returnString;
    })().then((response) => {
      message.channel.send(response);
    });

  };
});
