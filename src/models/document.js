"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    static associate(models) {
      Document.belongsTo(models.Element, {
        foreignKey: "id_element",
        as: "element",
        hooks: true,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Document.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
      path: DataTypes.STRING,
      name: DataTypes.STRING,
      id_element: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Document",
    }
  );
  return Document;
};
