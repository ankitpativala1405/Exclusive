const loggedUser = require("../model/loggeduser");

const LoggedController = {
  getAll: async (_, res) => {
    let user = await loggedUser.find();
    res.send(user);
  },
  post: async (req, res) => {
    try {
      let user = await loggedUser.create(req.body);
      // let data = await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.send(error);
    }
  },
  delete: async (req, res) => {
    const { username } = req.params;
    const deletedItem = await loggedUser.findOneAndDelete({ username });
    res.status(200).json({ message: "Item deleted", item: deletedItem });
  },
};

module.exports = LoggedController;
