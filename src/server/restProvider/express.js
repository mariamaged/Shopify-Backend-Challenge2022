import express from 'express';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';
import { version, name } from '../../../package.json';
import { errorHandler, authenticator } from '../middlewares';
import swaggerSpec from '../swagger';
import imagesV1 from '../../app/images.v1';

const upload = multer({ dest: './public/data/images' });
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
    // app.use(['/v1/images'], authenticator);

    // register new route
    app.get('/token', getToken);
    app.use('/v1/images', imagesV1);
    app.use(errorHandler.generalException);
    app.use(errorHandler.notRegisteredRoute);
  } catch (error) {
    console.error('app::initExpress', error);
    process.exit(-1);
  }
  return app;
}
