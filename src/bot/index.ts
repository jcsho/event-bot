import { Client, ClientOptions, Collection } from "discord.js";
import { event } from './commands/event';
import { prefix } from '../config';

export class EventBot extends Client {

  private commands: any;
  private prefix: string;

  /**
   * Default Constructor
   * @param token - Discord bot token
   * @param options - Options for underlying client, see [Discord.JS](https://discord.js.org/#/docs/main/stable/typedef/ClientOptions)
   */
  constructor(token?: string, options?: ClientOptions) {
    super(options);
    if (token !== undefined) this.token = token;
    this.commands = new Collection();
    this.commands.set(event.name, event);
    this.prefix = prefix;
  }

  /**
   * Connect to Discord
   */
  connect(): Promise<string> {
    if (!this.token) {
      throw "Token is not set";
    }
    // try logging in
    return this.login(this.token);
  }

  /**
   * Main runtime function, handles all commands and operations
   */
  run(): void {
    this.on("message", (message) => {
      if (!message.content.startsWith(this.prefix) || message.author.bot) return;

      const args = message.content.slice(prefix.length).split(/ +/);
      const command = args.shift()!.toLowerCase();

      try {
        this.commands.get(command).execute(message, args);
      } catch (err) {
        console.error(err);
        message.reply(`Error executing the command ${message}`);
      }
    });
  }
}
