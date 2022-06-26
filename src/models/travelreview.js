'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TravelReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TravelReview.belongsTo(models.Travel, {
        foreignKey: {
          name: "id_travel",
          allowNull: true,
          unique: false
        },
        as: "travel_travelreview",
        hooks: true,
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });
    }
  }
  TravelReview.init({
    review: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TravelReview',
  });
  return TravelReview;
};