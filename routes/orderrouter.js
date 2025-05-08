const { Router } = require("express");
const OrderController = require("../controller/OrderController");
const orderrouter = Router();

orderrouter.post("/",OrderController.post)


module.exports=orderrouter
