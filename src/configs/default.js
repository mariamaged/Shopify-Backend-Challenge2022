export default
{
  logLevel: 'info',
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV,
  host: 'localhost',
  bodyLimit: '100kb',
  authenticationDetails: {
    secret: process.env.JWT_TOKEN,
    tolerance: process.env.TOLERANCE,
  },
  postgres: {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.NODE_ENV === 'development' ? 'localhost' : '',
    dialect: 'postgres',
    schema: process.env.PG_SCHEMA || 'main',
    logging: false,
  },
  firebase: {
    apiKey: process.env.FIREBASE_WEB_API_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
  },
  defaultCredentials: {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  }
};
