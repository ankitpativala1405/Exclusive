const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    img: { type: String },
    name: { type: String },
    price: { type: String },
    mrp: { type: String },
    sku: { type: String, required: true, unique: true },
    username: { type: String },
  },
  {
    timestamps: true,
  }
);

const wishlistItem = mongoose.model("wishlist", wishlistSchema);
module.exports = wishlistItem;
