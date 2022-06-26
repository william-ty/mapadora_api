'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InterestPoints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      point: {
        type: Sequelize.STRING
      },
      order: {
        type: Sequelize.INTEGER
      },
      id_element: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InterestPoints');
  }
};