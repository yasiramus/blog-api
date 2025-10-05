import { config } from "dotenv";
config();

const Config = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    WHITELIST_ORIGINS: ['https://www.postman.com/yasira/workspace/blog-api',]
    // 'https://docs.blog-api.com'
}

export default Config