const User = require("../model/users");

const UserController = {
  getAll: async (req, res) => {
    let user = await User.find();
    res.send(user);
  },
  post: async (req, res) => {
    try {
      let user = await User.create(req.body);
      // let data = await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = UserController;
