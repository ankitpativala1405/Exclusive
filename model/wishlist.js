const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    img: { type: String },
    name: { type: String },
    price: { type: String },
    sku: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const wishlistItem = mongoose.model("cart", wishlistSchema);
module.exports = wishlistItem;
