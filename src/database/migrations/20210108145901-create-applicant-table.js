"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("applicants", {
      positionId: {
        type: Sequelize.INTEGER.UNSIGNED,
        onDelete: "CASCADE",
        references: {
          model: "Positions",
          key: "id",
          as: "positionId",
        },
      },
      personId: {
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
        onDelete: "CASCADE",
        references: {
          model: "Persons",
          key: "id",
          as: "personId",
        },
      },
      country: { type: Sequelize.STRING, allowNull: false },
      city: { type: Sequelize.STRING(), allowNull: false },
      streetAddress: { type: Sequelize.STRING(), allowNull: false },
      phoneNumber: { type: Sequelize.STRING(50), allowNull: false },
      previousPositions: { type: Sequelize.TEXT, allowNull: false },
      status: {
        type: Sequelize.TEXT,
      },
      skype: { type: Sequelize.STRING },
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
    await queryInterface.dropTable("applicants");
  },
};
