"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("People", "jobPositionId", {
      type: Sequelize.INTEGER.UNSIGNED,
      references: {
        model: "Positions",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("People", "jobPositionId");
  },
};
