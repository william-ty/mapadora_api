"use strict";
const { Model } = require("sequelize");
const { Travel } = require("../models/index");
const bcrypt = require("bcryptjs");
// const Travel_Traveler = require('travel_traveler_permission');

// get config vars
const dotenv = require("dotenv");
// access config var
dotenv.config();
const secret = process.env.TOKEN_SECRET;

module.exports = (sequelize, DataTypes) => {
  class Traveler extends Model {
    static associate(models) {
      Traveler.belongsToMany(models.Travel, {
        through: models.Travel_Traveler,
        as: "travels",
        foreignKey: {
          name: "id_traveler",
          // allowNull: false,
          // hooks: true,
          // onDelete: "CASCADE",
          // onUpdate: "CASCADE",
        },
      });
      Traveler.hasOne(models.Diary, {
        foreignKey: {
          name: "id_traveler",
          allowNull: false,
          hooks: true,
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        as: "traveler_diary",
      });
      Traveler.hasOne(models.Position, {
        foreignKey: {
          name: "id_traveler",
          allowNull: false,
          hooks: true,
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        as: "traveler_position",
      });
      // Set null delete / allow null ??
      Traveler.hasOne(models.Element, {
        foreignKey: {
          name: "id_traveler",
          allowNull: false,
          hooks: true,
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        },
        as: "traveler_element",
      });
    }

    static generate_hash = (password) => bcrypt.hashSync(password, 10);

    // Overriding this method allows changes to responses content
    toJSON() {
      const data = Object.assign({}, this.get());
      delete data.password;
      return data;
    }

    check_password(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }

  Traveler.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      },
      firstname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: 2,
            msg: "Firstmane must be 2 characters at least",
          },
        },
      },
      lastname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: 2,
            msg: "Lastname must be 2 characters at least",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: 2,
            msg: "Password must be 6 characters at least",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Traveler",
      // defaultScope: {
      //   attributes: { exclude: ['password'] },
      // },
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, secret);
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
      instanceMethods: {
        validPassword: (password) => {
          return bcrypt.compareSync(password, this.password);
        },
      },
    }
  );
  return Traveler;
};
