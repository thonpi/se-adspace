import { ALL } from "dns";

require('dotenv').config();

const env = {
  DB_URI: process.env.DB_URI ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  JWT_EXPIRES_IN: parseInt(process.env.JWT_EXPIRES_IN ?? '0'),
  PORT: parseInt(process.env.PORT ?? '0'),
  ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS ?? '').split(',')
};

export default env;
