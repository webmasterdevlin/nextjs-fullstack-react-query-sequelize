import { Sequelize } from "sequelize";
import getConfig from "next/config";

const { name, user, pass } = getConfig().publicRuntimeConfig.postgres;

const db = new Sequelize(name, user, pass, {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.sync({ logging: console.log })
  .then(() => console.log("Connection to database established successfully."))
  .catch((err) => console.log("Unable to connect to the database:", err));

export default db;
