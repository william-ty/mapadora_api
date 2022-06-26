"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      Photo.belongsTo(models.Travel, {
        foreignKey: {
          name: "id_travel",
          allowNull: false,
        },
        as: "travel_photo",
        hooks: true,
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      });
    }
  }
  Photo.init(
    {
      point: DataTypes.GEOMETRY("POINT", 4326),
      path: DataTypes.STRING,
      is_in_album: DataTypes.BOOLEAN,
      is_public: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Photo",
    }
  );
  return Photo;
};
