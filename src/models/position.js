"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Position.belongsTo(models.Travel, {
        foreignKey: {
          name: "id_travel",
          allowNull: false,
          unique: false,
        },
        as: "travel_position",
        hooks: true,
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });
      Position.belongsTo(models.Traveler, {
        foreignKey: {
          name: "id_traveler",
          allowNull: false,
          unique: false,
        },
        as: "traveler_position",
        hooks: true,
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });
    }
  }
  Position.init(
    {
      point: DataTypes.GEOMETRY("POINT", 4326),
    },
    {
      sequelize,
      modelName: "Position",
    }
  );
  return Position;
};
