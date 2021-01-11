import Sequelize from "sequelize";

import sequelize from "../database/connection";
import Person from "../persons/personsModel";

const Role = sequelize.define(
  "roles",
  {
    name: { type: Sequelize.STRING, allowNull: false },
  },
  {
    timestamps: true,
  }
);

Role.hasMany(Person);
Person.belongsTo(Role);

export default Role;
