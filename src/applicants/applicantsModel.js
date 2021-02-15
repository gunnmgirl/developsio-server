import Sequelize from "sequelize";

import sequelize from "../database/connection";
import Person from "../persons/personsModel";

const Applicant = sequelize.define(
  "applicants",
  {
    country: { type: Sequelize.STRING, allowNull: false },
    city: { type: Sequelize.STRING(), allowNull: false },
    streetAddress: { type: Sequelize.STRING(), allowNull: false },
    phoneNumber: { type: Sequelize.STRING(50), allowNull: false },
    previousPositions: { type: Sequelize.TEXT, allowNull: false },
    skype: { type: Sequelize.STRING },
    personId: {
      type: Sequelize.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    positionId: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
    statusId: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Applicant.belongsTo(Person);
Person.hasOne(Applicant);

export default Applicant;
