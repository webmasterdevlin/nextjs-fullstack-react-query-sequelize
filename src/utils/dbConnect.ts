import { Sequelize } from "sequelize";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { postgres },
} = getConfig();

const db = new Sequelize(postgres.name, postgres.user, postgres.pass, {
  host: postgres.host,
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
