const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const ContactItem = mongoose.model("Contact", contactSchema);
module.exports = ContactItem;
