"use strict";
const { Model } = require("sequelize");
const { afterCreateTaskListTag } = require("../utils/tasklisttag_util");

module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    static associate(models) {
      Trip.belongsTo(models.Element, {
        foreignKey: {
          name: "id_element",
          allowNull: "false",
        },
        as: "element",
        hooks: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Trip.belongsTo(models.TransportMode, {
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
  Trip.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
    },
    {
      sequelize,
      modelName: "Trip",
      // hooks: {
      //   afterCreate: async (instance) => {
      //     afterCreateTaskListTag(sequelize, instance);
      //   }
      // }
    }
  );
  return Trip;
};
