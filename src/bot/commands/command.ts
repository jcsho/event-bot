import { Message } from 'discord.js';

/**
 * Structure for entire command object
 */
export interface Command {
  /** Name of the bot command (prefer lower case) */
  name: string,
  /** (Optional) few words describing the command use */
  description?: string,
  /** Require arguments with command */
  args: boolean,
  /** Example usage of command */
  usage: string,
  /** Rate limit between command execution in second(s) */
  cooldown: number,
  /**
   * Functionalities of command
   * @param message - Discord `Message` object
   * @param args - words following command
   */
  execute(message: Message, args: string[]): any
}