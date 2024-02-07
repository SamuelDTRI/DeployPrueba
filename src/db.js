require("dotenv").config();
const { Sequelize } = require("sequelize");
const userModel = require("./modeluser");
const catsModel = require("./catsModel");

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: "railway",
        username: "postgres",
        password: "Ea3Ge5cf*36*a24BE2gdd1EdD4gae6CD",
        host: "viaduct.proxy.rlwy.net",
        port: 12123,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: false,
        native: false,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        {
          logging: false,
          native: false,
        }
      );

userModel(sequelize);
catsModel(sequelize);

const { user, cats } = sequelize.models;

user.belongsToMany(cats, { through: "users_cats" });
cats.belongsToMany(user, { through: "users_cats" });

module.exports = { sequelize, user, cats };
