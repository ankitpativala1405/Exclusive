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
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedItem = await OrderItem.findOneAndDelete({ id });

      if (!deletedItem) {
        return res.status(404).json({ message: "Item not found" });
      }

      res.status(200).json({ message: "Item deleted", item: deletedItem });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
};
module.exports = OrderController;
