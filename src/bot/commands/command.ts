import { Message } from 'discord.js';

/**
 * Structure for entire command object
 */
export interface Command {
  name: string,
  description?: string,
  args: boolean,
  usage: string,
  cooldown: number,
  execute(message: Message, args: string[]): any
}