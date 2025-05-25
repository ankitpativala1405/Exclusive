const UserDetail = require("../model/UserDetail");

const UserDetailController = {
  Get: async (_, res) => {
    let user = await UserDetail.find();
    res.send(user);
  },
  Create: async (req, res) => {
    let user = await UserDetail.create(req.body);
    res.status(201).json(user);
  },
  Update: async (req, res) => {
    const { id } = req.body;
    let user = await UserDetail.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    res.status(201).json(user);
  },
  delete: async (req, res) => {
    const { id } = req.body;
    let user = await UserDetail.findByIdAndDelete({ id });
    res.status(200).json({ message: "User Detail deleted successfully" });
  },
};

module.exports = UserDetailController;
