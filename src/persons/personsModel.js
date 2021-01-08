import Sequelize from "sequelize";

import sequelize from "../database/connection";
import Note from "../notes/notesModel";

const Person = sequelize.define(
  "persons",
  {
    id: { type: Sequelize.BIGINT.UNSIGNED, primaryKey: true, allowNull: false },
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
    },
    imageUrl: { type: Sequelize.STRING, default: null },
  },
  {
    timestamps: true,
  }
);

Person.hasMany(Note);
Note.belongsTo(Person);

export default Person;
