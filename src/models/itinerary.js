"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Itinerary extends Model {
    static associate(models) {
      Itinerary.belongsTo(models.Element, {
        foreignKey: {
          name: "id_element",
        },
        as: "element_itinerary",
        hooks: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Itinerary.hasOne(models.TaskList, {
        foreignKey: {
          name: "id_task_list",
        },
        as: "tasklist_itinerary",
        hooks: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Itinerary.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      modelName: "Itinerary",
    }
  );
  return Itinerary;
};
