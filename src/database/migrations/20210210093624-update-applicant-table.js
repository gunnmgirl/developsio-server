"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(`applicants`, `status`);
  },

  down: async (queryInterface, Sequelize) => {},
};
