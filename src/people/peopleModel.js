import Sequelize from "sequelize";

import sequelize from "../database/connection";

const People = sequelize.define(
  "people",
  {
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    jobPosition: {
      type: Sequelize.STRING,
    },
    country: { type: Sequelize.STRING(3), allowNull: false },
    city: { type: Sequelize.STRING(50), allowNull: false },
    streetAddress: { type: Sequelize.STRING(100), allowNull: false },
    phoneNumber: { type: Sequelize.STRING(15), allowNull: false },
    previousPositions: { type: Sequelize.TEXT, allowNull: false },
    skype: { type: Sequelize.STRING },
    imageUrl: { type: Sequelize.STRING, default: null },
  },
  {
    timestamps: true,
  }
);

export default People;
