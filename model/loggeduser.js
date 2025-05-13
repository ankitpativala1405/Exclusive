const mongoose = require("mongoose");

const LoggedShema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    number: { type: Number, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const loggedUser = mongoose.model("LoggedUser", LoggedShema);
module.exports = loggedUser;
