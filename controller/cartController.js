const CartItem = require("../model/cart");


const CartController = {
  getAll: async (_, res) => {
    let user = await CartItem.find();
    res.send(user);
  },
  post: async (req, res) => {
    try {
      let user = await CartItem.create(req.body);
      // let data = await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = CartController;
