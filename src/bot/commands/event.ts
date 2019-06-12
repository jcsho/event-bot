import { Message } from "discord.js";

export const event = {
  name: "event",
  description: "event [option]",
  execute(message: Message, args: string[]) {
    message.channel.send(`The message received was ${message}`);
    if (args.length) {
      message.channel.send(`Extra arguments:`);
      args.forEach(element => {
        message.channel.send(element);
      });
    }
  }
};
