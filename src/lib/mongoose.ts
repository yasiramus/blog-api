import mongoose from "mongoose";

import Config from "@/config";

/**types */
import type { ConnectOptions } from "mongoose";

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

/**establish connection using mongoose */
export const connectToDatabase = async (): Promise<void> => {
    if (!Config.CONNECTION_STRING) {
        throw new Error('Connection string is\'nt defined in the configuration');
    }

    try {
        await mongoose.connect(Config.CONNECTION_STRING, clientOptions);
        console.log('Connected to MongoDB database successfully', {
            uri: Config.CONNECTION_STRING.replace(/(mongodb\+srv:\/\/.+?:).+?(@.+)/, '$1****$2'),
            options: clientOptions
        });

    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        console.error('Error connecting to MongoDB database:', error);
    }
}

/**disconnect from the database */
export const disconnectFromDatabase = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB database successfully', {
            uri: Config.CONNECTION_STRING,
            options: clientOptions
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        console.error('Error disconnecting from the database:', error);

    }
}