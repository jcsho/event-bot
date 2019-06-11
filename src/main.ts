import { Client } from 'discord.js';

// Create new client
const client = new Client();

// Log to console when ready
client.once('ready', () => {
  console.log('Ready!');
});

// Login to discord
client.login(/* Insert Bot Token */);

// Listen for a message
client.on('message', (message) => {
  console.log(message.content);
});