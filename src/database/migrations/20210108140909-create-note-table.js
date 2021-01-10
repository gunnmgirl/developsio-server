"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("notes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      title: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      isPrivate: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
      },
      personId: {
        type: Sequelize.BIGINT.UNSIGNED,
        onDelete: "CASCADE",
        references: {
          model: "Persons",
          key: "id",
          as: "personId",
        },
      },
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
    await queryInterface.dropTable("notes");
  },
};
