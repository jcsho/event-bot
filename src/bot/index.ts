import { Client, ClientOptions, Collection } from 'discord.js';
import { Command } from './commands/command';
import { event } from './commands/event';
import { prefix } from '../config';

/**
 * Discord Bot that manages events through text channel
 */
export class EventBot extends Client {
  private commands: Collection<string, Command>;
  private cooldowns: Collection<string, Collection<string, number>>;
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
    this.commands = new Collection();
    this.cooldowns = new Collection();
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
    this.commands.set(event.name, event);

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
      const commandName = args.shift()!.toLowerCase();

      if (!this.commands.has(commandName)) {
        return;
      }

      const command: Command = this.commands.get(commandName)!;

      if (command.args && !args.length) {
        let reply = `No arguments provided for command ${commandName}`;

        if (command.usage) {
          reply += `\nExample: \`${prefix} ${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
      }

      if (!this.cooldowns.has(command.name)) {
        this.cooldowns.set(command.name, new Collection());
      }

      const cd = this.cooldown(command, message.author.id);
      if (cd !== 0) {
        return message.channel.send(`Cooldown: ${cd} seconds`);
      }

      try {
        command.execute(message, args);
      } catch (err) {
        // TODO (justin) change to custom logger transport
        console.error(err);
      }
    });
  }

  /**
   * Add delay for each command
   * @param command - the command to run
   * @param userId - user running the command
   */
  private cooldown(command: Command, userId: string): number {
    if (!this.cooldowns.has(command.name)) {
      this.cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps: Collection<string, number> = this.cooldowns.get(command.name)!;
    const cooldownAmount = (command.cooldown) * 1000;

    if (timestamps.has(userId)) {
      const expirationTime = timestamps.get(userId)! + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return timeLeft;
      }
    }

    timestamps.set(userId, now);
    this.setTimeout(() => timestamps.delete(userId), cooldownAmount);

    return 0;
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
