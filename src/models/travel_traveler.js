'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Travel_Traveler extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Travel_Traveler.init({
    id_permission: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Travel_Traveler',
    indexes:[{
      unique: true,
      fields: ['id_travel', 'id_traveler','id_permission']
    }]
  });
  return Travel_Traveler;
};