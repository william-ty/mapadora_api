'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransportMode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransportMode.hasOne(models.Trip, {
        foreignKey: {
          name: "id_transportmode",
          allowNull: true,
          hooks: true,
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        },
        as: "transport_mode",
      });
    }
  }
  TransportMode.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TransportMode',
  });
  return TransportMode;
};