import './server/globals';
import config from './configs';
import createApp from './server';
import database from './database/models';
import https from 'https';
import fs from 'fs';
const app = createApp();

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(config.port, async () => {
  await database.initializeDatabase();
  console.info('App start', `Started on port ${config.port}`);
});

