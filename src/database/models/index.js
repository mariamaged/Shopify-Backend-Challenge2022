/* eslint-disable global-require,import/no-dynamic-require */
import { join } from 'path';
import Sequelize from 'sequelize';

const db = {};
const { postgres } = config;
const {
  database, username, password, schema,
} = postgres;
const sequelize = new Sequelize(database, username, password, postgres);
db.sequelize = sequelize;

const model = require(join(__dirname, 'Image.js'))(sequelize, Sequelize.DataTypes);
db.Image = model;

db.initializeDatabase = async () => {
  try {
    const result = await sequelize
      .query('select schema_name from information_schema.schemata ',
        { type: sequelize.QueryTypes.SELECT });
    const schemaFound = result.find((o) => o.schema_name === schema);

    if (!schemaFound) {
      await sequelize.createSchema(schema);
    }
    await sequelize.sync();
  } catch (err) {
    throw err;
  }
};

export default db;
