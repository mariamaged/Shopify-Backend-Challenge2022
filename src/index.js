/* eslint-disable no-undef */
import './server/globals';
import config from './configs';
import createApp from './server';

const app = createApp();
app.listen(config.port, () => {
  console.info('App start', `Started on port ${config.port}`);
});
