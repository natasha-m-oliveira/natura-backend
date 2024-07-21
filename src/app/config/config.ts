import * as dotenv from 'dotenv';

dotenv.config();

type Configuration = {
  APP_PORT: string;
  APP_ADDR: string;
  APP_VERSION: string;
  DB_URL_POSTGRES: string;
  DB_URL_MONGO: string;
};

export const config: Configuration = {
  APP_PORT: process.env.APP_PORT || '3100',
  APP_ADDR: `${process.env.APP_HOST || '127.0.0.1'}:${process.env.APP_PORT || '3100'}`,
  APP_VERSION: process.env.APP_VERSION || '1.0.0',
  DB_URL_POSTGRES: process.env.DB_URL_POSTGRES,
  DB_URL_MONGO: process.env.DB_URL_MONGO,
};
