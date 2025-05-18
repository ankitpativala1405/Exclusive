const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    img: { type: String },
    name: { type: String },
    price: { type: String },
    quantity: { type: Number },
    sku: { type: String },
    username: { type: String },
    orderId: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, default: "pending" },
    payment: { type: String },
    total: { type: String },
  },
  {
    timestamps: true,
  }
);

const OrderItem = mongoose.model("Order", OrderSchema);
module.exports = OrderItem;

