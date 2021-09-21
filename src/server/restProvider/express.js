import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { version, name } from '../../../package.json';
import { errorHandler } from '../middlewares';
import swaggerSpec from '../swagger';
import imagesV1 from '../../app/images.v1';

const healthcheckInfo = {
  status: `${name} is up!!`,
  version,
};

export default function create() {
  const app = express();
  try {
    console.debug('app::initExpress', 'express app init');
    app.set('showStackError', true);
    console.debug('app::initExpress', 'express app init middleware');
    app.use(express.json());

    app.get('/healthcheck', (req, res) => res.send(healthcheckInfo));
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // register new route
    app.use('/v1', imagesV1);
    app.use(errorHandler.generalException);
    app.use(errorHandler.notRegisteredRoute);
  } catch (error) {
    console.error('app::initExpress', error);
    process.exit(-1);
  }
  return app;
}
