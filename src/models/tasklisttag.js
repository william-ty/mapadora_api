"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TaskListTag extends Model {
    static associate(models) {
      TaskListTag.belongsToMany(models.Task, { through: "Task_TaskListTag",foreignKey:"task_list_tag_id" });

      TaskListTag.belongsTo(models.TaskList, {
        foreignKey: {
          name: "id_task_list",
        },
        as: "tasklist_itinerary",
        hooks: true,
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });
    }
  }
  TaskListTag.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TaskListTag",
    }
  );
  return TaskListTag;
};
