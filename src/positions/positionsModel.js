import Sequelize from "sequelize";

import sequelize from "../database/connection";

const Position = sequelize.define(
  "positions",
  {
    name: { type: Sequelize.STRING(30), allowNull: false },
    details: { type: Sequelize.TEXT },
  },
  {
    timestamps: true,
  }
);

export default Position;
