import { Command } from './command';
import { Message } from 'discord.js';

/**
 * Event interactions
 */
export const event: Command = {
  name: 'event',
  description: 'Manage events',
  args: true,
  usage: '[action] [options]',
  cooldown: 5,
  execute(message: Message, args: string[]) {
    if (args[0] === 'create') {
      message.channel.send('You tried creating an event');
    }
  }
};
