import { config } from "dotenv";
config();

// 'https://docs.blog-api.com',
const Config = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV,
    WHITELIST_ORIGINS: ['https://www.postman.com/yasira/workspace/blog-api'],
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    LOG_LEVEL: process.env.LOG_LEVEL || 'info'
}

export default Config