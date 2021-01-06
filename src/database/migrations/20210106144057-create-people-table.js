"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("people", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jobPosition: {
        type: Sequelize.STRING,
      },
      country: { type: Sequelize.STRING(3), allowNull: false },
      city: { type: Sequelize.STRING(), allowNull: false },
      streetAddress: { type: Sequelize.STRING(), allowNull: false },
      phoneNumber: { type: Sequelize.STRING(50), allowNull: false },
      previousPositions: { type: Sequelize.TEXT, allowNull: false },
      skype: { type: Sequelize.STRING },
      imageUrl: { type: Sequelize.STRING, default: null },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date(),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("people");
  },
};
