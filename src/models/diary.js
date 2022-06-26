"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Diary extends Model {
    static associate(models) {
      Diary.belongsTo(models.Travel, {
        foreignKey: {
          name: "id_travel",
          allowNull: false,
          unique: false,
        },
        as: "travel_diary",
        hooks: true,
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });
      Diary.belongsTo(models.Traveler, {
        foreignKey: {
          name: "id_traveler",
          allowNull: false,
          unique: false,
        },
        as: "traveler_diary",
        hooks: true,
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });
    }
  }
  Diary.init(
    {
      content: DataTypes.TEXT,
      is_in_album: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Diary",
    }
  );
  return Diary;
};
