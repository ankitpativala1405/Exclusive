const mongoose = require("mongoose");
require("dotenv").config();

const DbConnect = async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log(`Mongoose connected ....... `);
};

module.exports = DbConnect;
