"use strict";
const { DATE } = require("sequelize");
const { Model } = require("sequelize");
const { Traveler } = require("../models/index");
// const { Travel_Traveler } = require('./travel_traveler_permission');

// const Travel_Traveler = "Travel_Traveler";

module.exports = (sequelize, DataTypes) => {
  class Travel extends Model {
    static associate(models) {
      Travel.belongsToMany(models.Traveler, {
        through: models.Travel_Traveler,
        as: "travelers",
        foreignKey: {
          name: "id_travel",
          // allowNull: false,
          // hooks: true,
          // onDelete: "CASCADE",
          // onUpdate: "CASCADE",
        },
      });
      Travel.hasOne(models.Participant, {
        as: "participant_travel",
        foreignKey: {
          name: "id_travel",
        },
        hooks: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Travel.hasMany(models.Element, {
        foreignKey: {
          name: "id_travel",
          allowNull: false,
        },
        as: "element_travel",
        hooks: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Travel.hasMany(models.Photo, {
        foreignKey: {
          name: "id_travel",
          allowNull: false,
        },
        as: "travel_photo",
        hooks: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Travel.hasOne(models.Diary, {
        foreignKey: {
          name: "id_travel",
          allowNull: false,
          hooks: true,
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        as: "travel_diary",
      });
      Travel.hasOne(models.Position, {
        foreignKey: {
          name: "id_travel",
          allowNull: false,
          hooks: true,
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        as: "travel_position",
      });
      Travel.hasOne(models.TravelReview, {
        foreignKey: {
          name: "id_travel",
          allowNull: true,
          hooks: true,
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        as: "travel_travelreview",
      });
      Travel.belongsTo(models.TravelTag, {
        foreignKey: {
          name: "id_traveltag",
          allowNull: true,
          unique: false,
        },
        as: "travel_traveltag",
        hooks: true,
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });
      Travel.hasOne(models.Travel, {
        foreignKey: {
          name: "id_public_travel",
          allowNull: true,
          hooks: true,
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        },
        as: "travel_public_travel",
      });
    }
    // toJSON() {
    //   const data = Object.assign({}, this.get());
    //   delete data.Travel_Traveler;
    //   return data;
    // }
  }
  Travel.init(
    {
      // TODO : Check following lines are usefull?
      // id: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      // },
      name: DataTypes.STRING,
      is_public: DataTypes.BOOLEAN,
      is_album_public: DataTypes.BOOLEAN,
      path_uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      },
      predicted_date: DataTypes.DATE,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      commentary: DataTypes.STRING,
      path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Travel",
    }
  );
  return Travel;
};
