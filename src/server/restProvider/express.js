import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { version, name } from '../../../package.json';
import { errorHandler, authenticator, requestValidator } from '../middlewares';
import swaggerSpec from '../swagger';
import cors from 'cors';
import imagesV1 from '../../app/images.v1';

const healthcheckInfo = {
  status: `${name} is up!!`,
  version,
};

const corsOptions = {
  origin: "http://localhost:8081",
}

export default function create() {
  const app = express();
  try {
    console.debug('app::initExpress', 'express app init');
    app.set('showStackError', true);
    console.debug('app::initExpress', 'express app init middleware');
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(helmet());

    app.get('/healthcheck', (req, res) => res.send(healthcheckInfo));    
    app.post('/token', authenticator.credentialsValidation, requestValidator, authenticator.getToken);
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use(['/v1/images'], authenticator.authenticate);

    // register new route
    app.use('/v1/images', imagesV1);
    app.use(errorHandler.generalException);
    app.use(errorHandler.notRegisteredRoute);
  } catch (error) {
    console.error('app::initExpress', error);
    process.exit(-1);
  }
  return app;
}
