/**
 * @copyright Sira_the_niqqabist
 * @created 2025-06-10
 * @license Apache-2.0
 */

import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';

/**custom modules */
import config from '@/config';
import router from '@/routes/v1';
import limiter from '@/lib/express_rate_limit';

/**types */
import { CorsOptions } from 'cors';

/**app initialization */
const app = express();

/**cors configure */
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (config.NODE_ENV === 'development' || config.WHITELIST_ORIGINS.includes(origin!)) {
            callback(null, true)
            console.log(`CORS: ${origin} allowed`);
        } else {
            //reject request from non-whitelisted origin
            callback(new Error(`CORS error: ${origin} is not allowed`), false)
            console.log(`CORS error: ${origin} is not allowed`);
        }
    }
};

/**middlewares */
app.use(cors(corsOptions));

/**enable json body request */
app.use(express.json());

/**enable urlencoded body request
 * extended: true -> support rich objects and arrays
 * extended: false -> support only simple bodies (i.e. no nested objects)
 */
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //parse cookies from request headers
app.use(compression({
    threshold: 1024, //compress only responses greater than 1KB in size
}))//reduce size of response body and increase the speed
app.use(helmet()) //enhance security by setting various HTTP headers

/**
 * prevent excessive requests from same IP and enhance security
 */
app.use(limiter);

/**routes */
app.use(router);

(async () => {

    try {
        app.listen(config.PORT, () => {
            console.log(`Server running: http://localhost:${config.PORT}`);
        })
    } catch (error) {
        console.error('Failed to start server:', error);
        if (process.env.NODE_ENV !== 'production') return process.exit(1);
    }
}
)();