"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsToMany(models.TaskListTag, { through: "Task_TaskListTag", foreignKey: "task_id" });

      Task.belongsTo(models.TaskList, {
        foreignKey: {
          name: "id_task_list",
        },
        as: "tasklist_task",
        hooks: true,
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });

      Task.belongsTo(models.Element, {
        foreignKey: {
          name: "id_element",
        },
        as: "task_element",
        hooks: true,
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });
    }
  }

  Task.init(
    {

      name: DataTypes.STRING,
      execution_date: DataTypes.DATEONLY,
      is_terminated: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
