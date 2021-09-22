import { Model } from 'sequelize';
import { PERMISSIONS } from './enums';

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
  }
  Image.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    permission: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: Object.values(PERMISSIONS),
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    bytes: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    keywords: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'image',
    underscored: true,
  });

  return Image;
};
