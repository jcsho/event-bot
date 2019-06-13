import { botToken } from './config';
import { EventBot } from './bot/EventBot';

const bot = new EventBot(botToken);

bot
  .connect()
  .then(() => {
    // * for debugging
    // bot.on('message', message => {
    //   console.log(message.content);
    // });
  })
  .catch((err) => console.log(err));
