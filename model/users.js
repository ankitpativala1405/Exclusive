const mongoose = require("mongoose");
// required: true

const UserSchema = new mongoose.Schema(
  {
    name: { type: String,required: true },
    email: { type: String, unique: true },
    number: { type: Number },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
