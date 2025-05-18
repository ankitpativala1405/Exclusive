const { Router } = require("express");
const OrderController = require("../controller/OrderController");
const orderrouter = Router();

orderrouter.get("/",OrderController.getAll)
orderrouter.post("/",OrderController.post)


module.exports=orderrouter
