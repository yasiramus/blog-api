import { config } from "dotenv";
config();

const Config = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV,
    WHITELIST_ORIGINS: ['https://www.postman.com/yasira/workspace/blog-api',],
    CONNECTION_STRING: process.env.CONNECTION_STRING
    // 'https://docs.blog-api.com',

}

export default Config