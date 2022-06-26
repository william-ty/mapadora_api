'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const secret = process.env.TOKEN_SECRET;
    const bcrypt = require("bcryptjs");

    const salt = bcrypt.genSaltSync(10, secret);
    const encrypt_pass = (password) => bcrypt.hashSync(password, salt);
    await queryInterface.bulkInsert(
      "Travelers",
      [
        {
          firstname: "pierre",
          lastname: "kraemer",
          email: "pierre@kraemer.com",
          password: encrypt_pass("12345"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert('Travels', [
      {
        name: "Un jour spécial à l'IUT",
        is_public: true,
        commentary: "Redécouvrons l'IUT Robert Schuman lors de ce parcours.",
        path: 'uploads/iut.jpg',
        id_traveltag: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

    await queryInterface.bulkInsert('Elements', [
      {
        name: "itineraire IUT",
        description: "L'itineraire de l'IUT",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 10,
        id_traveler: 4
      },

    ], {});

    await queryInterface.bulkInsert('Itineraries', [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 34
      },
    ], {});

    await queryInterface.bulkInsert('TaskLists', [
      {
        name: "tasklist",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_itinerary: 10
      },
    ], {});

    await queryInterface.bulkInsert('Elements', [
      {
        name: "La porte",
        description: "Rencontre près de la porte",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 10,
      },
      {
        name: "Bibliothèque",
        description: "Les livres c'est merveilleux !",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 10,
      },
      {
        name: "Restaurant Universitaire",
        description: "C'est quand qu'on miam ?",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 10,
      },
      {
        name: "trajet",
        description: "hâte d'y être",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 10,
      },
      {
        name: "trajet",
        description: "trop bien cette étape",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 10,
      },
      {
        name: "trajet",
        description: "la vie est belle",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 10,
      },
      {
        name: "Un banc paisible",
        description: "ouaaaa!",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 10,
      },
      {
        name: "Arbres",
        description: "c'est si beau la nature !",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 10,
      },
      {
        name: "Bureau de W",
        description: "c'est perdu d'avance...",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 10,
      },
      {
        name: "Un évenement unique",
        description: "notre dernier jour !",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 10,
      },
      {
        name: "Limace",
        description: "trop mignon",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 10,
      },
      {
        name: "Reunion",
        description: "au restaurant c'est marrant",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 10,
      },
      {
        name: "Sieste",
        description: "aprèss manger c'est cool !",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 10,
      },

    ], {});

    await queryInterface.bulkInsert('Trips', [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 37,
        id_transportmode: 2
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 38,
        id_transportmode: 4
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 39,
        id_transportmode: 4
      },
    ], {});

    await queryInterface.bulkInsert('Steps', [
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.735825 48.530439)'),
        duration: 2,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 34,
        id_trip: 1
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.736378 48.529243)'),
        duration: 4,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 35,
        id_trip: 2
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.737427 48.528913)'),
        duration: 1,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 36,
        id_trip: 3
      },
    ], {});

    await queryInterface.bulkInsert('InterestPoints', [
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.735496 48.530254)'),
        order: 1,
        day: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 40,
        id_step: 1
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.735984 48.530110)'),
        order: 2,
        day: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 41,
        id_step: 1
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.735549 48.530007)'),
        order: 3,
        day: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 42,
        id_step: 1
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.736691 48.528997)'),
        order: 4,
        day: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 43,
        id_step: 1
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.736501 48.528310)'),
        order: 5,
        day: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 44,
        id_step: 2
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.737862 48.528902)'),
        order: 6,
        day: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 45,
        id_step: 3
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.737985 48.529122)'),
        order: 7,
        // day: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 46,
        id_step: 3
      },
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
