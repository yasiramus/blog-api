import winston from "winston";

import Config from "@/config";

const { combine, timestamp, json, printf, colorize, errors, align } = winston.format;

/**transport array to hold diff log transport*/
const transports: winston.transport[] = [];

/**
 * add console transport only in non-production env
 */
if (Config.NODE_ENV !== 'production') {
    transports.push(
        new winston.transports.Console({
            format: combine(
                colorize({ all: true }),//add color to all log levels
                timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),//add timestamp to log
                align(),//align log messages
                printf(({ timestamp, level, message, ...meta }) => {
                    const metaString = Object.keys(meta).length ? `\n${JSON.stringify(meta)}` : '';
                    return `${timestamp} [${level}]:${message}${metaString}`;
                })
            )
        })
    )
}


/**create the logger instance using winston */
const logger = winston.createLogger({
    level: Config.LOG_LEVEL, //default set to info
    format: combine(timestamp(), errors({ stack: true }), json()),//use json format with timestamp and stack trace for errors
    transports,
    silent: Config.NODE_ENV === 'test' //disable log output during testing
})

export { logger };