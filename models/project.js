'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {

      Project.belongsTo(models.User, {
        foreignKey: "manager_id",
        as: "manager",
      });
      Project.hasMany(models.ProjectMember,{
          foreignKey:"project_id",
          as:"members"
      });
    }
  }

  Project.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Project title is required",
          },
        },
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("Pending", "In Progress", "Completed"),
        defaultValue: "Pending",
      },

      manager_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Project",
      tableName: "Projects",
      timestamps: true,
    }
  );

  return Project;
};