'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Elements', [
      {
        name: "Chamonix",
        description: "hâte d'y être",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "Entrèves",
        description: "trop bien cette étape",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "Lavachey",
        description: "la vie est belle",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "Orsières",
        description: "incroyable !",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "Bagnes",
        description: "quel aventure !",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "Salvan",
        description: "vivement qu'on rentre...",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "trajet",
        description: "hâte d'y être",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "trajet",
        description: "trop bien cette étape",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "trajet",
        description: "la vie est belle",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "trajet",
        description: "incroyable !",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "trajet",
        description: "quel aventure !",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "trajet",
        description: "vivement qu'on rentre...",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "Grand Balcon du Sud",
        description: "ouaaaa!",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "Musée Alpin Chamonix",
        description: "quelle architecture !",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "Balade à Chamonix",
        description: "blabla...",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "Le trésor caché de la montagne",
        description: "quel vue !",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "La dent du père castor",
        description: "trop mignon",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "Excursion artistique",
        description: "unique",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "Pont du beau passant",
        description: "miam",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "La ravine d'autrefois",
        description: "j'en reviens pas",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "Lac de l'antijeu",
        description: "la vie est belle",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "Tiroliène de la mort",
        description: "incroyable !",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "La crète du dindon",
        description: "quel frayeur !",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },
      {
        name: "Le panneau toutes directions",
        description: "vivement qu'on rentre...",
        createdAt: new Date(),
        updatedAt: new Date(),
        id_travel: 4,
      },

    ], {});

    await queryInterface.bulkInsert('Trips', [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 16,
        id_transportmode: 1
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 17,
        id_transportmode: 2
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 18,
        id_transportmode: 3
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 19,
        id_transportmode: 4
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 20,
        id_transportmode: 5
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 21,
        id_transportmode: 6
      }
    ], {});

    await queryInterface.bulkInsert('Steps', [
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(6.879663 45.922859)'),
        duration: 4,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 10,
        id_trip: 1
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(6.960428 45.814918)'),
        duration: 1,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 11,
        id_trip: 2
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.025350 45.852280)'),
        duration: 2,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 12,
        id_trip: 3
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.148084 46.027750)'),
        duration: 8,
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 13,
        id_trip: 4
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.223848 46.070153)'),
        duration: 1,
        order: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 14,
        id_trip: 5
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.022415 46.117772)'),
        duration: 2,
        order: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 15,
        id_trip: 6
      }
    ], {});

    await queryInterface.bulkInsert('InterestPoints', [
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(6.850350 45.936418)'),
        order: 1,
        day: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 10,
        id_step: 1
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(6.871548 45.923870)'),
        order: 2,
        day: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 11,
        id_step: 1
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(6.881651 45.920260)'),
        order: 3,
        day: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 12,
        id_step: 1
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.043012 45.940905)'),
        order: 4,
        day: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 13,
        id_step: 1
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.080401 46.001287)'),
        order: 5,
        // day: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 14,
        id_step: 2
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.031439 46.016237)'),
        order: 6,
        day: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 15,
        id_step: 3
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(6.971331 46.060056)'),
        order: 7,
        day: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 10,
        id_step: 3
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.169418 46.035108)'),
        order: 8,
        day: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 11,
        id_step: 4
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.218018 46.016053)'),
        order: 9,
        day: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 12,
        id_step: 4
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.21802 45.971595)'),
        order: 10,
        day: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 13,
        id_step: 4
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.134786 46.044374)'),
        order: 11,
        day: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 14,
        id_step: 4
      },
      {
        point: Sequelize.fn('ST_GeomFromText', 'POINT(7.140053 45.982347)'),
        order: 6,
        // day: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        id_element: 15,
        id_step: 5
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
