const ContactItem = require("../model/contact");

const ContactController = {
  Get: async (_, res) => {
    res.send(await ContactItem.find());
  },
  Post: async (req, res) => {
    let contact = await ContactItem.create(req.body);
    res.status(201).json(contact);
  },
  delete: async (req, res) => {
    let contact = await ContactItem.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  },
};
module.exports = ContactController;
