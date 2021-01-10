import Sequelize from "sequelize";

import sequelize from "../database/connection";

const Note = sequelize.define(
  "notes",
  {
    title: { type: Sequelize.STRING, allowNull: false },
    body: { type: Sequelize.TEXT },
    isPrivate: {
      type: Sequelize.TINYINT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Note;
