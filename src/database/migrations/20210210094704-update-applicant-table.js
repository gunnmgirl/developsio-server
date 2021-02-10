"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(`applicants`, `statusId`, {
      type: Sequelize.INTEGER.UNSIGNED,
      after: `skype`,
      references: {
        model: `statuses`,
        key: `id`,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(`applicants`, `statusId`);
  },
};
