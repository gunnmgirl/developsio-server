import Sequelize from "sequelize";

import sequelize from "../database/connection";
import Applicant from "../applicants/applicantsModel";

const Position = sequelize.define(
  "positions",
  {
    name: { type: Sequelize.STRING, allowNull: false },
    details: { type: Sequelize.TEXT },
  },
  {
    timestamps: true,
  }
);

Position.hasMany(Applicant, { foreignKey: "positionId" });

export default Position;
