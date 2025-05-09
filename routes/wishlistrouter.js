const { Router } = require("express");
const wishlistController = require("../controller/wishlistcontroller");

const wishlistrouter = Router();

wishlistrouter.post("/",wishlistController.post)

module.exports = wishlistrouter;