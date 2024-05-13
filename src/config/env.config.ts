import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
import logger from '../common/utils/logger';

// const envPath = path.resolve(process.cwd(), `.${process.env.NODE_ENV}.env`);
dotenv.config();

dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV === 'test' ? '.test.env' : '.env'),
});

//* get the intended host and port number, use localhost and port 3000 if not provided
const envVarsSchema = Joi.object()
    .keys({
        USER_SERVICE_PORT: Joi.number().default(3004),
        MONGO_URI: Joi.string().required().description('Mongo DB URI'),
        JWT_SECRET_KEY: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
        GITHUB_API_URL: Joi.string().required().description('GitHub API URL'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    logger.error(`Config validation error: ${error.message}`);
    throw new Error(`Config validation error: ${error.message}`);
}

//* Export the config object based on the NODE_ENV
const config = {
    port: envVars.USER_SERVICE_PORT,
    mongo_uri: envVars.MONGO_URI,
    jwt: {
        secret: envVars?.JWT_SECRET_KEY || 'secret',
        accessExpirationMinutes: envVars?.JWT_ACCESS_EXPIRATION_MINUTES || 30,
        refreshExpirationDays: envVars?.JWT_REFRESH_EXPIRATION_DAYS || 30,
        resetPasswordExpirationMinutes: 10,
    },
    github: {
        apiUrl: envVars.GITHUB_API_URL,
    },
};

export default config;
