const { Router } = require("express");
const CartController = require("../controller/cartController");

const cartrouter = Router();
cartrouter.get("/", CartController.getAll);
cartrouter.post("/", CartController.post);

module.exports = cartrouter;
