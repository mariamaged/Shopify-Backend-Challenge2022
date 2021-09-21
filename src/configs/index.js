import _ from 'lodash';
import errors from './errorCodes';

const config = _.merge({},
  require('./default').default, errors);

export default config;
