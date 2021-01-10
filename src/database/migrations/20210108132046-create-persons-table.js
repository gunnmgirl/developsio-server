"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("persons", {
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
      password: {
        type: Sequelize.STRING(100),
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      roleId: {
        type: Sequelize.INTEGER.UNSIGNED,
        onDelete: "CASCADE",
        references: {
          model: "Roles",
          key: "id",
          as: "roleId",
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
    await queryInterface.dropTable("persons");
  },
};
