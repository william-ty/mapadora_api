"use strict";
const { Model } = require("sequelize");
const { Travel } = require("../models/index");
const bcrypt = require("bcryptjs");

// get config vars
const dotenv = require("dotenv");
// access config var
dotenv.config();
const secret = process.env.TOKEN_SECRET;

module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    static associate(models) {
      Participant.belongsTo(models.Travel, {
        as: "participant_travel",
        foreignKey: {
          name: "id_travel",
          allowNull: false,
        },
      });
      Participant.belongsTo(models.Traveler, {
        as: "participant_traveler",
        foreignKey: {
          name: "id_traveler",
          allowNull: true
        }
      })
    }
  }

  Participant.init(
    {
      id_participant: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: 2,
            msg: "Firstmane must be 2 characters at least",
          },
        },
      },
      email: {
        type: DataTypes.STRING(50),
        validate: { isEmail: true },
        allowNull: true

      },
      has_refused: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: "Participant",
      // hooks: {
      //   afterCreate: async (instance) => {

      //     console.log(JSON.stringify(instance))

      //     const itinerary = sequelize.models.Itinerary.findOne({
      //       include: [{
      //         model: sequelize.models.Element, required: true, as: "element_itinerary",
      //         where: {
      //           id_travel: instance.id_travel
      //         }
      //       }]
      //     });

      //     console.log("JSON.stringify(itinerary)")
      //     console.log(JSON.stringify(itinerary))

      //     // const taskList = await sequelize.models.TaskList.findByPk(itinerary.id);
      //     // const taskListId = taskList.id;

      //     // await sequelize.models.TaskListTag.create({
      //     //   name: instance.name,
      //     //   id_task_list: taskListId
      //     // });
      //   },
      // },
      indexes: [
        {
          unique: true,
          fields: ['email', 'id_travel']
        }
      ]

    },
  );
  return Participant;
};
