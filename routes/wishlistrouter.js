const { Router } = require("express");
const wishlistController = require("../controller/wishlistcontroller");

const wishlistrouter = Router();

wishlistrouter.get("/",wishlistController.getAll)
wishlistrouter.post("/",wishlistController.post)
wishlistrouter.delete("/:sku",wishlistController.delete)

module.exports = wishlistrouter;