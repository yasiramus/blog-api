import express from 'express'
import cors from 'cors'

/**custom modules */
import config from '@/config'

/**types */
import { CorsOptions } from 'cors'

/**express app initialization */
const app = express()

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
}

/**middleware */
app.use(cors(corsOptions))

app.get('/', (_req, res) => {
    res.json({
        message: "Hello world"
    })
})
app.listen(config.PORT, () => {
    console.log(`Server running: http://localhost:${config.PORT}`);
})