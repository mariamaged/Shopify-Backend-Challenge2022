/* eslint-disable no-unused-vars */
import config from '../../configs/index';

// global error handler
const generalException = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }
  const errors = [{
    type: err.type || config.errors.GENERIC.type,
    code: err.code || config.errors.GENERIC.code,
    message: err.message || config.errors.GENERIC.message,
  }];
  return res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ errors });
};

// Not found Error
const notRegisteredRoute = (req, res, next) => {
  const errors = [{
    type: config.errors.ROUTE.type,
    code: config.errors.ROUTE.code,
    message: config.errors.ROUTE.message,
  }];
  res.status(HttpStatus.NOT_FOUND).json({ errors });
};

export default { generalException, notRegisteredRoute };
