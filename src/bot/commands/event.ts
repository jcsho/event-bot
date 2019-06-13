import { Command } from './command';

/**
 * Event interactions
 */
export const event: Command = {
  name: 'event',
  description: 'Manage events',
  args: true,
  usage: '[action] [options]',
  cooldown: 5,
  execute(message, args) {
    switch (args[0]) {
      case 'create':
        return message.channel.send('Creating event');
      case 'find':
        return message.channel.send('Finding event');
      case 'list':
        return message.channel.send('Listing all events');
      case 'delete':
        return message.channel.send('Deleting event');
      default:
        return message.channel.send('Unknown action');
    }
  }
};
