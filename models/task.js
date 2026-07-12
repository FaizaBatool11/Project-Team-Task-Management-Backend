'use strict';

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      console.log("Task associate called");
      Task.belongsTo(models.Project, {
        foreignKey: "project_id",
        as: "project",
      });

      Task.belongsTo(models.User, {
        foreignKey: "assigned_to",
        as: "assignedUser",
      });
    }
  }

  Task.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: DataTypes.STRING,
      priority: DataTypes.STRING,
      due_date: DataTypes.DATE,
      project_id: DataTypes.INTEGER,
      assigned_to: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "Tasks",
      timestamps: true,
    }
  );

  return Task;
  console.log("Task model loaded");
};