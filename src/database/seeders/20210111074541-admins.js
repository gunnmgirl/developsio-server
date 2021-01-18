"use strict";

const passwordHasher = require("../../utils/passwordHasher");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = "135be41b841c9ed446b0bf4ec1a7a2ee29ebd7f4";
    const hashed = await passwordHasher.hash(password);
    return queryInterface.bulkInsert("persons", [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: "Lara",
        lastName: "Croft",
        email: "lara@gmail.com",
        password: hashed,
        imageUrl:
          "https://res.cloudinary.com/gunnmgirl/image/upload/v1610351296/woman_1_rpgzfh.svg",
        roleId: 11,
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: "Faith",
        lastName: "Connors",
        email: "faith@gmail.com",
        password: hashed,
        imageUrl:
          "https://res.cloudinary.com/gunnmgirl/image/upload/v1610351332/woman_s99nkm.svg",
        roleId: 11,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("persons", null, {});
  },
};
