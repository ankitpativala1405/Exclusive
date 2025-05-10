const { Router } = require("express");
const wishlistController = require("../controller/wishlistcontroller");

const wishlistrouter = Router();

wishlistrouter.get("/",wishlistController.getAll)
wishlistrouter.post("/",wishlistController.post)

module.exports = wishlistrouter;