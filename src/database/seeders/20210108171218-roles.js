"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("roles", [
      {
        name: "Applicant",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
