require("dotenv").config();
const path = require("path")

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      // port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: { min: 0, max: 7 },
  },
  test: {
    client: 'mysql2',
    connection: {
      connection: {
        host: '127.0.01',
        port: '3306',
        user: 'root',
        password: 'Kolade11',
        database: 'testDb',
      },
    },
    seeds: {
      directory: path.join(__dirname, './test/seeds'),
    },
    migrations: {
      directory: path.join(__dirname, './test/migrations'),
    },
    useNullAsDefault: true,
  },
};
