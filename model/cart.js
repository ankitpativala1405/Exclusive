const mongoose = require("mongoose");
// required: true

const CartSchema = new mongoose.Schema(
  {
    img: { type: String,},
    name: { type: String,},
    price: { type: String,},
    quantity: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

const CartItem = mongoose.model("cart", CartSchema);
module.exports = CartItem;
