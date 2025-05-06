const { Router } = require("express");
const UserController = require("../controller/usercontroller");

const router=Router()
router.get("/",UserController.getAll)
router.post("/",UserController.post)


module.exports=router





