const OrderItem = require("../model/order");

const OrderController = {
  post: async (req, res) => {
    try {
      let order = await OrderItem.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.send(error);
    }
  },
  getAll: async (_, res) => {
    let user = await OrderItem.find();
    res.send(user);
  },
};
module.exports = OrderController;
