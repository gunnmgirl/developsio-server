"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(`statuses`, [
      {
        name: `Submitted Application`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: `In Interview Phase`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: `Received Technical Task`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: `Task In Review`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: `Approved`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: `Deleted`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(`statuses`, null, {});
  },
};
