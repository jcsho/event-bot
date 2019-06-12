import * as dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

/** Discord Bot Token */
export const botToken = process.env.BOT_TOKEN;

/** Bot Activation Prefix */
export const prefix = '$';