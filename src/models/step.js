"use strict";
const { Model } = require("sequelize");
const { afterCreateTaskListTag } = require("../utils/tasklisttag_util");

module.exports = (sequelize, DataTypes) => {
  class Step extends Model {
    static associate(models) {
      Step.belongsTo(models.Element, {
        foreignKey: {
          name: "id_element",
          allowNull: false,
        },
        as: "element",
        hooks: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Step.hasMany(models.InterestPoint, {
        foreignKey: {
          name: "id_step",
        },
        hooks: true,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Step.belongsTo(models.Trip, {
        foreignKey: {
          name: "id_trip",
          allowNull: true,
          unique: false,
        },
        as: "trip_step",
        hooks: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Step.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
      point: DataTypes.GEOMETRY("POINT", 4326),
      duration: DataTypes.INTEGER,
      order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Step",
      hooks: {
        afterCreate: async (instance) => {
          afterCreateTaskListTag(sequelize, instance);
        }
      }
    }
  );
  return Step;
};
