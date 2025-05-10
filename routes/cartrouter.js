const { Router } = require("express");
const CartController = require("../controller/cartController");

const cartrouter = Router();
cartrouter.get("/", CartController.getAll);
cartrouter.post("/", CartController.post);
cartrouter.patch("/:sku",CartController.update)
// cartrouter.delete("/:id",CartController.delete );
cartrouter.delete("/:sku", CartController.delete);

module.exports = cartrouter;
