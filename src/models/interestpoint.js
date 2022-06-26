"use strict";
const { Model } = require("sequelize");
const { afterCreateTaskListTag } = require("../utils/tasklisttag_util");

module.exports = (sequelize, DataTypes) => {
  class InterestPoint extends Model {
    static associate(models) {
      InterestPoint.belongsTo(models.Element, {
        foreignKey: {
          name: "id_element",
          allowNull: false,
        },
        as: "element",
        hooks: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      InterestPoint.belongsTo(models.Step, {
        foreignKey: {
          name: "id_step",
        },
        hooks: true,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  InterestPoint.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      point: DataTypes.GEOMETRY("POINT"),
      order: DataTypes.INTEGER,
      day: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "InterestPoint",
      hooks: {
        afterCreate: async (instance) => {
          afterCreateTaskListTag(sequelize, instance);
        }
      }
    }
  );
  return InterestPoint;
};
