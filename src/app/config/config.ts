type Configuration = {
  APP_PORT: string;
  APP_ADDR: string;
};

export const config: Configuration = {
  APP_PORT: process.env.APP_PORT || '3100',
  APP_ADDR: `${process.env.APP_HOST || '127.0.0.1'}:${process.env.APP_PORT || '3100'}`,
};
