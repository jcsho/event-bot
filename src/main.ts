import { Client } from 'discord.js';
import { botToken } from './config';

// Create new client
const client = new Client();

// Log to console when ready
client.once('ready', () => {
  console.log('Ready!');
});

// Login to discord
client.login(botToken);

// Listen for a message
client.on('message', (message) => {
  console.log(message.content);
});