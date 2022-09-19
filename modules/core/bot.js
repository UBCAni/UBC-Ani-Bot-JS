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


// This makes the bot do things when it spots a newly posted message
// matches the if statement
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

    // async arrow function
    (async () => {
      let returnString = "";
      // Fetch all events for guild (fetches a map)
      const eventsC = await message.guild.scheduledEvents.fetch()
      // Construct array from values portion of the received map
      const eventsArray = Array.from(eventsC.values());
      // empty variable for later use

      let event;
      //const eventsCollection = await message.guild.scheduledEvents.fetchSubscribers(eventsC);
      // 1019445086997729300 is the id of Icebreaker event. 
      // Can later be changed for variable
      for (let i = 0; i < eventsArray.length; i++) {
        if (eventsArray[i].id == 1019445086997729300) {
          event = eventsArray[i];
        }
      }
      //const [first] = eventsC.values();
      let events = await message.guild.scheduledEvents.fetchSubscribers(event);
      let values = await Array.from(events.values());

      // Requests in batches of 100 (cuz that's the limit)
      while (values.length == 100) {
        for (let i = 0; i < values.length; i++) {
          let addit = values[i].user.id + "\n";
          returnString += addit;
        }
        let last = values[99].user.id;
        events = await message.guild.scheduledEvents.fetchSubscribers(event, { after: last });
        values = await Array.from(events.values());
      }
      for (let i = 0; i < values.length; i++) {
        let addit = values[i].user.id + "\n";
        returnString += addit;
      }

      // Return the final list of id's
      return returnString;
    })().then((response) => {
      message.channel.send(response);
    });

  };
});