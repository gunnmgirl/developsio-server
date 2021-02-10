import Sequelize from "sequelize";

import sequelize from "../database/connection";
import Applicant from "../applicants/applicantsModel";

const Status = sequelize.define(
  "statuses",
  {
    name: { type: Sequelize.STRING, allowNull: false },
  },
  {
    timestamps: true,
  }
);

Status.hasMany(Applicant);
Applicant.belongsTo(Status);

export default Status;
