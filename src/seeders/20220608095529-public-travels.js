'use strict';
var fs = require('fs');
const path = require("path");
const dirPath = path.resolve(__dirname, '../../uploads/cover/');

var files = fs.readdirSync(dirPath)
/* now files is an Array of the name of the files in the folder and you can pick a random name inside of that array */
const chosenFile = () => files[Math.floor(Math.random() * files.length)]

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Travels', [
      {
        name: "Aventure en montagne",
        is_public: true,
        commentary: "J'ai peur...",
        path: 'uploads/cover/' + chosenFile(),
        id_traveltag: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Tour du monde en 80 jours",
        is_public: true,
        commentary: "Fait chauffer le train",
        path: 'uploads/cover/' + chosenFile(),
        id_traveltag: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "J'irai dormir chez vous",
        is_public: true,
        commentary: "On prend la tente au cas où",
        path: 'uploads/cover/' + chosenFile(),
        id_traveltag: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Nus et culottés",
        is_public: true,
        commentary: "Il va pleuvoir !",
        path: 'uploads/cover/' + chosenFile(),
        id_traveltag: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Traversée de la route 66",
        is_public: true,
        commentary: "Fait chauffer la Harley !",
        path: 'uploads/cover/' + chosenFile(),
        id_traveltag: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Randonnée des 3 chateaux",
        is_public: false,
        commentary: "C'est beau les Vosges",
        path: 'uploads/cover/' + chosenFile(),
        id_traveltag: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    await queryInterface.bulkInsert('Elements', [
      {
        name: "itineraire 4",
        description: "description",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
        id_traveler: 2
      },
      {
        name: "itineraire 5",
        description: "description",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 5,
        id_traveler: 3
      },
      {
        name: "itineraire 6",
        description: "description",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 6,
        id_traveler: 1
      },
      {
        name: "itineraire 7",
        description: "description",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 7,
        id_traveler: 2
      },
      {
        name: "itineraire 8",
        description: "description",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 8,
        id_traveler: 3
      },
      {
        name: "itineraire 9",
        description: "description",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 9,
        id_traveler: 1
      },

    ], {});

    await queryInterface.bulkInsert('Itineraries', [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 4
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 5
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 6
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 7
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 8
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 9
      }
    ], {});

    await queryInterface.bulkInsert('TaskLists', [
      {
        name: "tasklist",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_itinerary: 4
      },
      {
        name: "tasklist",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_itinerary: 5
      },
      {
        name: "tasklist",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_itinerary: 6
      },
      {
        name: "tasklist",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_itinerary: 7
      },
      {
        name: "tasklist",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_itinerary: 8
      },
      {
        name: "tasklist",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_itinerary: 9
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
