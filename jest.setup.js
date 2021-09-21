import 'dotenv/config';
import HttpStatus from 'http-status-codes';
global.reJSON = function reJSON(data) {
  return JSON.parse(JSON.stringify(data));
};

global.HttpStatus = HttpStatus;

global.config = {
  host: 'localhost',
  port: 4000,
  errors: {
    GENERIC: {
      message: 'Internal Error',
      code: 100,
      type: 'Genric Exception',
    },
    ROUTE: {
      message: 'Route not found',
      code: 101,
      type: 'Routing Error',
    },
    VALIDATION: {
      message: 'Invalid params',
      code: 102,
      type: 'Validation Error',
    },
  },
  postgres: {
    username: 'postgres',
    password: 'test',
    database: 'postgres',
    host: 'localhost',
    dialect: 'postgres',
    schema: 'main',
    logging: false,
  },
};
