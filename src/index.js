import './server/globals';
import config from './configs';
import createApp from './server';
import database from './database/models';
const app = createApp();

app.listen(config.port, async () => {
  await database.initializeDatabase();
  console.info('App start', `Started on port ${config.port}`);
});

