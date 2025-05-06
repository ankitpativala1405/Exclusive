const User = require("../model/users");

const UserController = {
  getAll: async (req, res) => {
    let user = await User.find();
    res.send(user);
  },
  post: async (req, res) => {
    console.log("Received body:", req.body);
    try {
      let user = await User.create(req.body);
      // let data = await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.send(error);
    }
  },
  // post: async (req, res) => {
  //   console.log("Received body:", req.body);
  //   try {
  //     let user = await User.create(req.body); // Fix here
  //     res.status(201).json(user);
  //   } catch (error) {
  //     res.status(400).json(error); // Send proper status for validation errors
  //   }
  // }
};

module.exports = UserController;
