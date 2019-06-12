import { Client } from 'discord.js';
import { botToken, prefix } from './config';

// Create new client
const client = new Client();

// Log to console when ready
client.once('ready', () => {
  console.log('Ready!');
});

// Listen for a message
client.on('message', (message) => {
  // Check if message is valid (not from bot or without prefix)
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Remove prefix from string and split into array of words
  const args = message.content.slice(prefix.length).split(/ +/);

  // Check if no command is passed
  if (!args.length) return;

  // `!` - suppress possible undefined
  const command = args.shift()!.toLowerCase();

  // Routing event message
  if (command === 'event') {
    // Exit on empty argument
    if (!args.length) {
      return message.channel.send(`No argument provided for ${command}`);
    }

    // Event options
    switch (args[0]) {
      case 'create':
        return message.channel.send('Creating event');
      case 'list':
        return message.channel.send('Listing event');
      default:
        return message.channel.send(`${args[1]} is undefined for option ${command}`);
    }
  }

});

// Login to discord
client.login(botToken);