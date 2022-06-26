'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TravelTag.hasOne(models.Travel, {
        foreignKey: {
          name: "id_traveltag",
          allowNull: true,
          unique: false
        },
        as: "travel_traveltag",
        hooks: true,
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });
      
    }
  }
  TravelTag.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TravelTag',
  });
  return TravelTag;
};