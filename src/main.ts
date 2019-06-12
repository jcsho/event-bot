import { botToken } from "./config";
import { EventBot } from './bot';

const bot = new EventBot(botToken);

bot.connect().then((message) => {
  console.log('Connected to Discord');
  bot.run();
}).catch(err => console.log(err));
