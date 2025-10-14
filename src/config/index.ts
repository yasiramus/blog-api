import { config } from 'dotenv';
config();

/**types */
import type ms from 'ms';

const Config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,

  WHITELIST_ORIGINS: ['https://www.postman.com/yasira/workspace/blog-api'],
  WHITELIST_ADMIN_MAIL: ['yasiratu@gmail.com', 'codewithsira@gmail.com'],

  CONNECTION_STRING: process.env.CONNECTION_STRING,

  LOG_LEVEL: process.env.LOG_LEVEL || 'info',

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

  ACCESS_TOKEN_EXPIRES_IN: process.env
    .ACCESS_TOKEN_EXPIRES_IN as ms.StringValue,
  REFRESH_TOKEN_EXPIRES_IN: process.env
    .REFRESH_TOKEN_EXPIRES_IN as ms.StringValue,
};

export default Config;
