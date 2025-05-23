const OrderItem = require("../model/order");

const OrderController = {
  // post: async (req, res) => {
  //   try {
  //     let order = await OrderItem.create(req.body);
  //     res.status(201).json(order);
  //   } catch (error) {
  //     res.send(error);
  //   }
  // },
  post: async (req, res) => {
    try {
      let order;

      if (Array.isArray(req.body)) {
        order = await OrderItem.insertMany(req.body); 
      } else {
        order = await OrderItem.create(req.body);
      }

      res.status(201).json(order);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating order", error: error.message });
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
  update: async (req, res) => {
    const { id } = req.params;
    const updatedItem = await OrderItem.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    res.status(200).json(updatedItem);
  },
UpdateStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await OrderItem.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).send("Order not found");
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating order status");
    }
}
};
module.exports = OrderController;
