'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TransportModes', [
      {
        name: "avion",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "velo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "bus",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "marche",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "voiture",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "hoverboard",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    await queryInterface.bulkInsert('TravelTags', [
      {
        name: "aventure",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "tour du monde",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "escapade",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "marche à pied",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "challenge",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "pélerinage",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
    await queryInterface.bulkInsert('Permissions', [
      {
        name: "regular",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
