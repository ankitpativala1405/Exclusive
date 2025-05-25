const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    name: { type: String, required: true },
    number: { type: Number, required: true },
    email: { type: String, required: true },
    apartment: { type: String },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    pincode: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const UserDetail = mongoose.model("UserDetail", UserDetailSchema);
module.exports = UserDetail;
