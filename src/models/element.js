"use strict";
const { Model } = require("sequelize");
// const { TaskListTag } = require("../models/index");
// const tasklisttag_ctrl = require("../controllers/tasklisttag_controller");
// const tasklisttagController = new tasklisttag_ctrl(TaskListTag);

module.exports = (sequelize, DataTypes) => {
  class Element extends Model {
    static associate(models) {
      Element.hasOne(models.InterestPoint, {
        foreignKey: {
          name: "id_element",
          allowNull: false,
        },
        as: "element_interestpoint",
      });
      Element.hasOne(models.Step, {
        foreignKey: {
          name: "id_element",
          allowNull: false,
        },
        as: "element_step",
      });
      Element.hasOne(models.Trip, {
        foreignKey: {
          name: "id_element",
          allowNull: false,
        },
        as: "element_trip",
      });
      Element.hasOne(models.Itinerary, {
        foreignKey: {
          name: "id_element",
        },
        as: "element_itinerary",
      });

      Element.hasOne(models.Task, {
        foreignKey: {
          name: "id_element",
        },
        as: "task_element",
        hooks: true,
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });

      Element.hasOne(models.Document, {
        foreignKey: {
          name: "id_element",
        },
        as: "element_document",
        hooks: true,
        onDelete: "CASCADE",
      });
      Element.belongsTo(models.Travel, {
        foreignKey: {
          name: "id_travel",
          allowNull: false,
        },
        as: "element_travel",
      });
      Element.belongsTo(models.Traveler, {
        foreignKey: {
          name: "id_traveler",
          allowNull: true,
          hooks: true,
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        },
        as: "element_traveler",
      });
    }
  }
  Element.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: 2,
            msg: "Name must be 2 characters at least",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: 1,
            msg: "Description must be 2 characters at least",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Element",
    }
  );
  return Element;
};
