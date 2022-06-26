"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TaskList extends Model {
    static associate(models) {
      TaskList.hasMany(models.TaskListTag, {
        foreignKey: {
          name: "id_task_list",
        },
        as: "task_list",
        hooks: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      TaskList.hasOne(models.Task, {
        foreignKey: {
          name: "id_task_list",
        },
        as: "tasklist_task",
        hooks: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      TaskList.belongsTo(models.Itinerary, {
        foreignKey: {
          name: "id_itinerary",
        },
        as: "tasklist_itinerary",
        hooks: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  TaskList.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TaskList",
    }
  );
  return TaskList;
};
