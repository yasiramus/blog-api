import { connect, disconnect } from "mongoose";

import Config from "@/config";

/**types */
import type { ConnectOptions } from "mongoose";
import { logger } from "@/lib/winston";

/**client option*/
const clientOptions: ConnectOptions = {
    dbName: 'blog-db',
    appName: 'Blog API',
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
}

const Options = {
    uri: Config.CONNECTION_STRING
        ? Config.CONNECTION_STRING.toString().replace(/(mongodb\+srv:\/\/.+?:).+?(@.+)/, '$1****$2')
        : '',
    options: clientOptions
}

/**establish connection using mongoose */
export const connectToDatabase = async (): Promise<void> => {
    if (!Config.CONNECTION_STRING) {
        throw new Error('Connection string is\'nt defined in the configuration');
    }

    try {
        await connect(Config.CONNECTION_STRING, clientOptions);
        logger.info('Connected to MongoDB database successfully', Options);

    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        logger.error('Error connecting to MongoDB database:', error);
    }
}

/**disconnect from the database */
export const disconnectFromDatabase = async (): Promise<void> => {
    try {
        await disconnect();
        logger.info('Disconnected from MongoDB database successfully', Options);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        logger.error('Error disconnecting from the database:', error);
    }
}