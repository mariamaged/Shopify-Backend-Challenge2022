export default
{
  logLevel: 'info',
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV,
  host: 'localhost',
  bodyLimit: '100kb',
  authenticationDetails: {
    secret: process.env.JWT_SECRET,
    tolerance: process.env.TOLERANCE,
  },
  postgres: {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.NODE_ENV === 'development' ? 'localhost' : `/cloudsql/${process.env.PG_CLOUD_CONNECTION_NAME}`,
    dialect: 'postgres',
    schema: process.env.PG_SCHEMA || 'main',
    logging: false,
  },
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    appId: process.env.FIREBASE_APP_ID,
  },
  defaultCredentials: {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  }
};
