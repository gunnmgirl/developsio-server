import Sequelize from "sequelize";

let sequelize;

if (process.env.NODE_ENV === "development") {
  sequelize = new Sequelize(
    process.env.DATABASE_DEV,
    process.env.USERNAME_DEV,
    process.env.PASSWORD_DEV,
    {
      host: process.env.HOST_DEV,
      dialect: "mysql",
    }
  );
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL);
}

sequelize.sync();

export default sequelize;
