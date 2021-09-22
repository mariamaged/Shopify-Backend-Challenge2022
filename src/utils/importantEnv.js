require('dotenv/config');

// Ensure required ENV vars are set
const requiredEnv = [
    'NODE_ENV',
    'PG_USERNAME',
    'PG_PASSWORD',
    'PG_DATABASE',
    'PG_SCHEMA',
    'FIREBASE_API_KEY',
    'FIREBASE_AUTH_DOMAIN',
    'FIREBASE_APP_ID',
    'FIREBASE_PROJECT_ID'
];
const unsetEnv = requiredEnv.filter((env) => !(typeof process.env[env] !== 'undefined'));

if (unsetEnv.length > 0) {
    throw new Error(`Required ENV variables are not set: [${unsetEnv.join(', ')}]`);
}
