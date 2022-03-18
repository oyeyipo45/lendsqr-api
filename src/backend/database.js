require("dotenv").config();
const knex = require("knex")
const config = require("../../knexfile")

// create connection
let db;
const connectDB = async () => {
  if (process.env.NODE_ENV === 'test') {
    db = knex(config.test);
  } else {
    db = knex(config.development);
    // Check that the connection works
    const connected = await db.raw('SELECT VERSION()')

      
    if (connected) {
      console.log(`connection to knex was successful!`);
    }
    
  }
}

connectDB()

module.exports = db;
