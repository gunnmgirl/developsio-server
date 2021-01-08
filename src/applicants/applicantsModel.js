import Sequelize from "sequelize";

import sequelize from "../database/connection";
import Person from "../persons/personsModel";

const Applicant = sequelize.define(
  "applicants",
  {
    country: { type: Sequelize.STRING(3), allowNull: false },
    city: { type: Sequelize.STRING(), allowNull: false },
    streetAddress: { type: Sequelize.STRING(), allowNull: false },
    phoneNumber: { type: Sequelize.STRING(50), allowNull: false },
    previousPositions: { type: Sequelize.TEXT, allowNull: false },
    skype: { type: Sequelize.STRING },
    status: { type: Sequelize.TEXT },
    personId: {
      type: Sequelize.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    positionId: {
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
