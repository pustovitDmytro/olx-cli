import { createLogger, format, transports } from 'winston';
/* eslint-disable camelcase */
const { npm_config_loglevel, VERBOSE, LOG_LEVEL } = process.env;
const level = LOG_LEVEL || VERBOSE && 'verbose' || npm_config_loglevel || 'info';
/* eslint-enable*/

export default createLogger({
    level,
    levels : {
        error   : 0,
        warn    : 1,
        info    : 2,
        notice  : 3,
        verbose : 4,
        debug   : 5
    },
    format : format.combine(
        format.timestamp(),
        format.json()
    ),
    transports : [ new transports.Console() ]
});

