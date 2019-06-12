import { Client, ClientOptions, Collection } from 'discord.js';
import { event } from './commands/event';
import { prefix } from '../config';

/**
 * Discord Bot that manages events through text channel
 */
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
    this.prefix = prefix;
    this.setup();
  }

  /**
   * Auguments event listeners for event bot specific functionality
   */
  private setup() {
    // Exit early if no prefix has been set
    if (this.prefix === undefined) {
      throw 'No prefix set for bot';
    }

    // Add commands from the ./commands folder (currently only event command)
    // TODO (justin) change to dynamically loading in files
    this.commands = new Collection().set(event.name, event);

    // Log all connections
    this.on('ready', () => {
      this.guilds.forEach(guild => {
        // TODO (justin) change to custom logger transport
        console.log(
          `[${this.readyAt.toDateString()}] Connected to server ${guild.name}`
        );
      });
    });

    this.on('message', message => {
      if (!message.content.startsWith(this.prefix) || message.author.bot) {
        return;
      }

      // Removes prefix from the entire string
      const args = message.content.slice(prefix.length).split(/ +/);
      // Take first word without prefix
      // args[0] is now the second word in the string
      const command = args.shift()!.toLowerCase();

      try {
        this.commands.get(command).execute(message, args);
      } catch (err) {
        // TODO (justin) change to custom logger transport
        console.error(err);
        message.channel.send(`Error executing the command ${message}`);
      }
    });
  }

  /**
   * Connect to Discord
   */
  public connect(): Promise<string> {
    if (!this.token) {
      throw 'Token is not set';
    }
    // try logging in
    return this.login(this.token);
  }

  /**
   * Change the text hook to start off text commands
   * @param newPrefix - string prefix, usually a single special char
   *
   * @example
   * ```typescript
   * bot.changePrefix('%');
   * ```
   */
  public set changePrefix(newPrefix: string) {
    this.prefix = newPrefix;
  }
}
