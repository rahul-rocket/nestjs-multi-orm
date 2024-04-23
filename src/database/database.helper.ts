/* eslint-disable prettier/prettier */

export type MikroLoggerNamespace = 'query' | 'query-params' | 'schema' | 'discovery' | 'info';

/**
 * Get logging options based on the provided dbLogging value.
 * @param {string} dbLogging - The value of process.env.DB_LOGGING
 * @returns {false | 'all' | ['query', 'error'] | ['error']} - The logging options
 */
export const getLoggingOptions = (dbLogging: string): false | 'all' | ['query', 'error'] | ['error'] => {
    let loggingOptions: false | 'all' | ['query', 'error'] | ['error'];
    switch (dbLogging) {
        case 'false':
            loggingOptions = false;
            break;
        case 'all':
            loggingOptions = 'all';
            break;
        case 'query':
            loggingOptions = ['query', 'error'];
            break;
        default:
            loggingOptions = ['error'];
    }
    return loggingOptions;
};

/**
 * Gets MikroORM logging options based on the specified logging type.
 *
 * @param dbLogging - The logging type.
 * @returns False if logging is disabled, or an array of LoggerNamespace for the specified logging type.
 */
export const getLoggingMikroOptions = (dbLogging: string): false | MikroLoggerNamespace[] => {
    const loggingOptionsMap: Record<string, MikroLoggerNamespace[]> = {
        query: ['query'],
        'query-params': ['query-params'],
        schema: ['schema'],
        discovery: ['discovery'],
        info: ['info'],
        all: ['query', 'query-params', 'schema', 'discovery', 'info']
    };

    return loggingOptionsMap[dbLogging] || false;
};